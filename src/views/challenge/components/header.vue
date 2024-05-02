<script setup>
import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import User from '@/components/user.vue'
import { useRouter } from 'vue-router'
import { getToken } from '@/utils/auth.js'
import { apiGetUserInfo } from '@/api/user.js'
import { Message } from '@arco-design/web-vue'
import { useUserStore } from '@/store/userStore.js'
import { apiGetProblemList } from '@/api/question.js'

const router = useRouter()
const visible = ref(false)
const handleCancel = () => {
	visible.value = false
}
const isLogin = ref(false)
let userInfo = reactive({})
if (getToken()) {
	isLogin.value = true
	// 获取用户信息
	apiGetUserInfo().then((res) => {
		if (res.status !== 200) {
			Message.error(res.msg)
			isLogin.value = false
			return
		}
		userInfo = res.data
		// 存储用户信息
		useUserStore().setUserInfo(res.data)
	})
}
const query = ref({
	pageNum: 1,
	pageSize: 20
})
const problemList = ref([])
const total = ref(0)
const openDrawer = async () => {
	const res = await apiGetProblemList(query.value)
	if (res.status !== 200) {
		Message.error(res.msg)
		return
	}
	problemList.value = res.data.Rows
	total.value = res.data.total
	visible.value = true
}

const isPause = ref(true)
const seconds = ref(0)
let timer = null
// 时间格式化
const formattedTime = computed(() => {
	const hh = Math.floor(seconds.value / 3600)
	const mm = Math.floor((seconds.value % 3600) / 60)
	const ss = seconds.value % 60
	return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`
})
const isStart = ref(false)
// 开始计时
const startTime = () => {
	isStart.value = true
}
// 暂停计时
const handleTime = () => {
	if (isPause.value) {
		startTimer()
	} else {
		pauseTimer()
	}
	isPause.value = !isPause.value
}
// 重置计时
const resetTime = () => {
	pauseTimer()
	seconds.value = 0
	isPause.value = true
}
// 计时器
const startTimer = () => {
	timer = setInterval(() => {
		seconds.value++
	}, 1000)
}
const pauseTimer = () => {
	clearInterval(timer)
}
onBeforeUnmount(() => {
	pauseTimer() // 组件卸载前清除定时器
})

const scrollbar = ref(true)
const bottom = ref(false)
// 滚动到底部
const fetchData = () => {
	if (problemList.value.length >= total.value) {
		bottom.value = true
		return
	} else {
		query.value.pageNum++
		apiGetProblemList(query.value).then((res) => {
			if (res.status !== 200) {
				Message.error(res.msg)
				return
			}
			problemList.value = problemList.value.concat(res.data.Rows)
		})
	}
}
const emit = defineEmits(['changeID'])
const handleProblem = (id) => {
	// 调用父组件的方法
	emit('changeID', id)
	visible.value = false
}
</script>

<template>
	<a-row align="center" :warp="false">
		<a-col :span="8" style="display: flex; align-items: center">
			<div class="logo">
				<router-link to="/">
					<img src="@/assets/logo.png" alt="MySQL自学网站" title="MySQL自学网站" />
				</router-link>
				<span>|</span>
			</div>
			<a-button-group>
				<a-button @click="openDrawer">
					<template #icon>
						<icon-menu-unfold size="20" style="display: flex" />
					</template>
					<template #default>题库</template>
				</a-button>
				<!--上一题-->
				<a-button>
					<template #icon>
						<icon-left />
					</template>
				</a-button>
				<!--下一题-->
				<a-button>
					<template #icon>
						<icon-right />
					</template>
				</a-button>
				<!--随机-->
				<a-button>
					<template #icon>
						<i class="iconfont icon-suiji"></i>
					</template>
				</a-button>
			</a-button-group>
		</a-col>
		<a-col :span="8" class="flex">
			<a-button @click="startTime" v-if="!isStart">
				<template #icon>
					<i class="iconfont icon-jishi"></i>
				</template>
			</a-button>
			<transition name="fade" appear>
				<a-button-group v-if="isStart" :class="{ showTime: isStart }">
					<a-button @click="() => (isStart = !isStart)">
						<template #icon>
							<icon-left />
						</template>
					</a-button>
					<a-button @click="handleTime">
						<template #icon>
							<icon-play-circle-fill size="22" v-show="isPause" />
							<icon-pause-circle-fill size="22" v-show="!isPause" />
						</template>
					</a-button>
					<span style="font-size: 15px"> {{ formattedTime }} </span>
					<a-button @click="resetTime">
						<template #icon>
							<icon-sync size="21" />
						</template>
					</a-button>
				</a-button-group>
			</transition>
		</a-col>
		<a-col :span="7" style="display: flex; align-items: center; justify-content: flex-end">
			<a-button type="secondary">
				<template #icon>
					<icon-tool size="20" />
				</template>
			</a-button>
			<a-button type="secondary" class="setting">
				<template #icon>
					<icon-fire size="20" />
				</template>
			</a-button>
			<div v-if="isLogin" class="user">
				<User :userInfo="userInfo" />
			</div>
			<div class="btn" v-else>
				<a-button type="text" shape="round" @click="() => router.push('/user/login')">登录</a-button>
				<span>或</span>
				<a-button type="primary" shape="round" @click="() => router.push('/user/register')"> 注册</a-button>
			</div>
		</a-col>
	</a-row>
	<a-drawer :width="640" :height="340" :visible="visible" placement="left" @cancel="handleCancel" :footer="false" closable unmountOnClose>
		<template #title>
			<a-link href="/question" style="font-size: 20px">
				题库
				<icon-right />
			</a-link>
		</template>
		<div>
			<a-list :max-height="900" @reach-bottom="fetchData" :scrollbar="scrollbar" hoverable>
				<a-list-item class="list-item" v-for="item in problemList" :key="item.id" @click="handleProblem(item.id)">
					<a-list-item-meta :title="item.name"></a-list-item-meta>
					<template #actions>
						<a-tag :color="item.difficulty === 'easy' ? 'green' : item.difficulty === 'medium' ? 'orange' : 'red'">
							{{ item.difficulty === 'easy' ? '简单' : item.difficulty === 'medium' ? '中等' : '困难' }}
						</a-tag>
					</template>
				</a-list-item>
				<template #scroll-loading v-if="!bottom">
					<a-spin />
				</template>
			</a-list>
		</div>
	</a-drawer>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.iconfont {
	font-size: 20px;
}

.logo {
	margin-left: 15px;
	width: 120px;
	display: flex;
	align-items: center;
	justify-content: space-around;

	img {
		width: 100%;
	}

	span {
		margin-left: 8px;
		font-size: 15px;
		color: #e4e4e4;
	}
}

.icon-jishi {
	font-size: 22px;
}

.btn {
	span {
		margin: 0 15px 0 10px;
	}
}

.setting {
	margin-right: 10px;
}

.flex {
	display: flex;
	justify-content: center;
	align-items: center;
}

.list-item {
	cursor: pointer;
}
</style>
