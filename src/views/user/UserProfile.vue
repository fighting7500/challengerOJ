<!--
 * @Author: 17197
 * @Date: 2024/3/29
 * @Description: UserProfile.vue
 * @Version: 1.0
 * @Last Modified time : 2024/3/29
-->
<script setup>
import { ref, computed, reactive } from 'vue'
import { useUserStore } from '@/store/userStore.js'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const selectedKey = ref(['1'])
const changeMenuItem = (key) => {
	selectedKey.value = [key]
	console.log(selectedKey.value)
}
const tabs = reactive([
	// { name: '评论', value: '1-1' },
	{ name: '题解', value: '1-2' },
	{ name: '文章', value: '1-3' }
])
const currentTab = ref(0)
const changeCurrentTab = (index) => {
	currentTab.value = index
}
const isCollect = ref(false)
const changeIcon = () => {
	isCollect.value = !isCollect.value
}

const columns = [{ title: '' }]

const form = reactive({
	value1: '',
	value2: '',
	value3: '',
	value4: '',
	value5: ''
})
</script>

<template>
	<a-layout id="user-info">
		<a-layout>
			<a-layout-sider class="slider">
				<div class="slider-head">
					<a-avatar :size="55" shape="square">
						<img alt="avatar" :src="userInfo.avatar" />
					</a-avatar>
					<div>
						<span>{{ userInfo.username }}</span>
					</div>
				</div>
				<a-divider style="margin: 0" />
				<a-menu :default-selected-keys="selectedKey" @menu-item-click="changeMenuItem">
					<a-menu-item key="1">
						<template #icon>
							<icon-star />
						</template>
						收藏夹
					</a-menu-item>
					<a-menu-item key="2">
						<template #icon>
							<icon-fire />
						</template>
						积分
					</a-menu-item>
					<a-menu-item key="3">
						<template #icon>
							<icon-idcard />
						</template>
						个人资料
					</a-menu-item>
				</a-menu>
			</a-layout-sider>
			<a-layout-content>
				<div v-if="selectedKey[0] === '1'">
					<div class="tabs">
						<div class="tab" v-for="(tab, index) in tabs" :key="index" @click="changeCurrentTab(index)" :class="{ active: index === currentTab }">
							<span>{{ tab.name }}</span>
						</div>
					</div>
					<div class="collect-content">
						<div class="collect-item" v-for="item in 40" :key="item">
							<span class="collect-icon" @click="changeIcon">
								<icon-star size="20" v-if="isCollect" />
								<icon-font type="icon-shoucang" :size="18" v-else />
							</span>
							<a-comment author="Socrates" content="Comment body comment body comment body comment body content.">
								<template #avatar>
									<a-avatar>
										<img alt="avatar" :src="userInfo.avatar" />
									</a-avatar>
								</template>
							</a-comment>
						</div>
					</div>
				</div>
				<div class="analyse" v-else-if="selectedKey[0] === '2'">
					<a-table :columns="columns" :data="data" />
				</div>
				<div class="analyse profile" v-else>
					<a-row justify="center">
						<a-avatar :size="100">
							<img alt="avatar" :src="userInfo.avatar" />
						</a-avatar>
					</a-row>
					<a-row style="margin-top: 30px">
						<a-form :model="userInfo" style="margin: 0 auto">
							<a-form-item field="userName" label="用户名" label-col-flex="80px">
								<a-input v-model="userInfo.username" placeholder="请输入用户名" />
							</a-form-item>
							<a-form-item field="userMobile" label="手机号" label-col-flex="80px">
								<a-input v-model="userInfo.phone" placeholder="请输入手机号" />
							</a-form-item>
							<a-form-item field="email" label="邮箱" label-col-flex="80px">
								<a-input v-model="userInfo.email" placeholder="请输入邮箱" />
							</a-form-item>
						</a-form>
						<a-space style="margin: 0 auto">
							<a-button>重置</a-button>
							<a-button type="primary">提交</a-button>
						</a-space>
					</a-row>
				</div>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<style scoped lang="scss">
#user-info {
	width: 1200px;
	height: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
}

.arco-layout-sider-light {
	background-color: initial;
	box-shadow: initial;
}

.slider {
	padding: 0 5px;
}

.slider-head {
	padding: 20px 0 10px;
	text-align: center;

	span {
		font-size: 20px;
		line-height: 40px;
	}
}

.tabs {
	display: flex;
	margin: 24px 0 40px 0;
	gap: 20px;

	.tab {
		padding: 10px 20px;
		cursor: pointer;
		border-radius: 8px;
	}

	.tab.active {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.tab:hover {
		background-color: #eff0f2;
	}
}

.collect-content {
	margin: 0 10px;
	background-color: #fff;
	box-shadow: 0 0 10px rgba(30, 31, 34, 0.19);
	border-radius: 3px;
	flex: 1 1 0;
	padding: 0 20px;
	height: auto;

	.collect-item {
		position: relative;
		display: flex;
		cursor: pointer;
		padding: 20px 0;
		border-bottom: 1px solid rgb(240, 240, 240);

		.action {
			display: inline-block;
			padding: 0 4px;
			color: var(--color-text-1);
			line-height: 24px;
			background: transparent;
			border-radius: 2px;
			cursor: pointer;
			transition: all 0.1s ease;
		}

		.action:hover {
			background: var(--color-fill-3);
		}
	}
}

.collect-icon {
	position: absolute;
	right: 0;
	top: 20px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.analyse {
	margin: 20px;
	background-color: #fff;
	box-shadow: 0 0 10px rgba(30, 31, 34, 0.19);
	border-radius: 3px;
	padding: 20px;
	height: auto;
}

.profile {
	width: 50%;
}
</style>
