<script setup>
import { ref } from 'vue'
import md from './README.md?raw'
const text = ref(md)
</script>

<template>
	<div class="content">
		<v-md-preview :text="text" preview-class="vuepress-markdown-body"></v-md-preview>
	</div>
</template>

<style lang="scss" scoped>
.content {
	height: 100%;
	width: 100%;
	overflow-y: scroll;
}
</style>