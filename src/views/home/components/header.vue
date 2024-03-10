<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const activeIndex = ref('')

const handleSelect = (key, keyPath) => {
	// 跳转到对应的页面
	// router.push(key)
	console.log(key, keyPath);
}

</script>

<template>
	<div class="head">
		<div class="logo">
			<router-link to="/">
				<img src="@/assets/logo.png" alt="编程挑战者" title="编程挑战者" />
			</router-link>
		</div>
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="1">学习</el-menu-item>
			<el-menu-item index="2">闯关</el-menu-item>
			<el-menu-item index="3">题库</el-menu-item>
			<el-menu-item index="4">讨论</el-menu-item>
		</el-menu>
		<div class="right">
			<el-input>
				<template #prefix>
					<i class="iconfont icon-sousuo"></i>
				</template>
			</el-input>
			<el-button text type="primary" shape="round" danger @click="() => router.push('/login')">登录</el-button>
			<el-button type="primary" shape="round" danger @click="() => router.push('/login/register')">注册</el-button>
		</div>
	</div>
	<el-divider style="margin: 0;"/>
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
	.el-menu-demo{
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
	}
}
.el-menu--horizontal.el-menu{
	border-bottom: none;
}
</style>