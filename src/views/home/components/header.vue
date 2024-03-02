<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const current = ref([''])
const items = ref([
	{
		key: 'play',
		label: '闯关'
	},
	{
		key: 'app',
		label: '题库'
	},
	{
		key: 'playground',
		label: '广场'
	}
])

const handle = ({ key }) => {
	// 跳转到对应的页面
	router.push(key)
}

</script>

<template>
	<div class="head">
		<div class="logo">
			<router-link to="/">
				<img src="@/assets/logo.png" alt="MySQL自学网站" title="MySQL自学网站" />
			</router-link>
		</div>
		<!-- <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click="handle"/> -->
		<div class="right">
			<!-- <SearchOutlined /> -->
			<router-link to="/login">登录</router-link>
			<a-button type="primary" shape="round" danger>注册</a-button>
		</div>
	</div>
	<a-divider />
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
	.ant-menu-horizontal {
		border-bottom: none;
	}
	.right {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		a {
			line-height: 64px;
			margin: 0 20px;
		}
	}
}
.ant-divider-horizontal {
	margin: 0;
}
</style>