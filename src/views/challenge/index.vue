<script setup>
import { ref } from 'vue'
import Header from './components/header.vue'
import Content from './components/content.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 监听路由的变化，将题目id传递给Content组件
const id = ref(route.params.id)
const changeID = (value) => {
	id.value = value
}
</script>

<template>
	<a-layout id="layout">
		<a-layout-header class="header">
			<Header @changeID="(id) => changeID(id)" />
		</a-layout-header>
		<a-layout-content class="content">
			<Content :problemId="id" />
		</a-layout-content>
	</a-layout>
</template>

<style lang="scss" scoped>
#layout {
	height: 100vh;
	background-color: #f2f3f5;
}
</style>
