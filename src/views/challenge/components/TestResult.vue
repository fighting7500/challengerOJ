<!--
 * @Author: 17197
 * @Date: 2024/3/28
 * @Description: TestResult.vue
 * @Version: 1.0
 * @Last Modified time : 2024/3/28
-->
<script setup>
import { ref } from 'vue'

const success = ref(false)
</script>

<template>
	<a-space id="test-result" direction="vertical" fill>
		<div class="head">
			<span class="title" :class="{ red: success }">通过</span>
			<span class="description">执行用时：13ms</span>
		</div>
		<!--输入-->
		<div class="input">
			<span class="description">输入</span>
			<div class="code-preview">"abcabcbb"</div>
		</div>
		<!--输出-->
		<div class="output">
			<span class="description">输出</span>
			<div class="code-preview">3</div>
		</div>
		<!--预期结果-->
		<div class="expect">
			<span class="description">预期结果</span>
			<div class="code-preview">3</div>
		</div>
	</a-space>
</template>

<style scoped lang="scss">
#test-result {
	height: 100%;
	width: 100%;
	padding: 0 20px;
	overflow-y: scroll;
}
.head {
	display: flex;
	align-items: center;
	margin-top: 20px;
	.title {
		font-size: 20px;
		color: #02b128;
	}
	.red {
		color: red;
	}
	.description {
		margin-left: 10px;
	}
}
.description {
	color: #8a8a99;
}
.code-preview {
	width: 100%;
	padding: 10px 10px;
	background-color: #f2f3f5;
	border-radius: 5px;
}
</style>
