<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getToken } from '@/utils/auth';
import User from './user.vue'
const router = useRouter()
const activeIndex = ref('')

activeIndex.value = router.currentRoute.value.path.split('/')[1]

// 根据路由判断当前选中的菜单
router.afterEach((to) => {
	activeIndex.value = to.path.split('/')[1]
})

const handleSelect = (key) => {
	// 跳转到对应的页面
	router.push(key)
	// console.log(key);
}

const searchText = ref('')
const search = () => {
	console.log(searchText.value)
}

// 判断有无登录
const isLogin = ref(false)
const userInfo = ref({})
// 页面创建的时候判断是否有token
const token = getToken('token')
if (token) {
	isLogin.value = true
	localStorage.getItem('userInfo') && (userInfo.value = JSON.parse(localStorage.getItem('userInfo')))
	console.log(localStorage.getItem('userInfo'));
}

</script>

<template>
	<div class="head">
		<div class="logo">
			<router-link to="/">
				<img src="@/assets/logo.png" alt="编程挑战者" title="编程挑战者" />
			</router-link>
		</div>
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="(index) => handleSelect(index)">
			<el-menu-item index="learn">学习</el-menu-item>
			<el-menu-item index="challenge">闯关</el-menu-item>
			<el-menu-item index="question">题库</el-menu-item>
			<el-menu-item index="community">讨论</el-menu-item>
		</el-menu>
		<div class="right">
			<div class="search-box">
				<input type="text" class="search-txt" placeholder="搜索" v-model="searchText" @click="search" />
				<a class="search-btn">
					<i class="iconfont icon-sousuo" aria-hidden="true"></i>
				</a>
			</div>
			<div v-if="isLogin">
				<User :userInfo="userInfo" />
			</div>
			<div class="btn" v-else>
				<el-button text type="primary" shape="round" danger @click="() => router.push('/login')">登录</el-button>
				<span>或</span>
				<el-button type="primary" shape="round" danger
					@click="() => router.push('/login/register')">注册</el-button>
			</div>
		</div>
	</div>
	<el-divider style="margin: 0;" />
</template>

<style lang="scss" scoped>
.head {
	width: 1200px;
	margin: 0 auto;
	display: flex;
	align-items: center;

	.logo {
		width: 150px;

		img {
			width: 100%;
		}
	}

	.el-menu-demo {
		margin-left: 30px;
		flex: 1;
	}

	.right {
		display: flex;
		align-items: center;

		a {
			line-height: 64px;
			margin: 0 20px;
		}

		i:hover {
			color: #a1a1a1;
		}

		.btn {
			span{
				margin: 0 10px;
			}
		}
	}
}

.search-box {
	// position: absolute;
	// bottom: 30px;
	// left: 30px;
	// box-shadow: 0 2px 25px 0 rgba(0, 0, 0, 0.1);
	// height: 40px;
	// padding: 10px;
	border-radius: 40px;
	display: flex;
}

.search-btn {
	color: #888888;
	font-size: 24px;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: 0.4s;
}

.search-txt {
	border: none;
	background: none;
	outline: none;
	padding: 0;
	color: #222;
	font-size: 16px;
	line-height: 40px;
	width: 0;
	transition: 0.4s;
}

.search-box:hover {
	background-color: #f5f5f5;
}

.search-box:hover .search-txt {
	width: 200px;
	padding: 0 12px;
}

.search-box:hover .search-btn {
	animation: rotate 0.4s linear;
}

.search-txt:focus {
	width: 200px;
	padding: 0 12px;
}

.search-txt:focus {
	width: 200px;
}

.el-menu--horizontal.el-menu {
	border-bottom: none;
}
</style>