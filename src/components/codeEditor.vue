<script setup>
import { ref, onMounted } from 'vue'
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

self.MonacoEnvironment = {
    getWorker() {
        return new EditorWorker()
    }
}
const editorRef = ref(null)

onMounted(async () => {
	editorRef.value = monaco.editor.create(editorRef.value, {
		value: 'console.log("Hello, world!")',
		language: 'javascript',
		theme: 'vs',
		scrollBeyondLastLine: false,    // 滚动超过最后一行
		formatOnPaste: true,    // 粘贴时格式化
		automaticLayout: true,  // 自动布局
		autoIndent: true,   // 自动缩进
		minimap: {
			enabled: false
		},
		wordWrap: 'on',
		renderLineHighlight: 'all',
		overviewRulerBorder: false,
		selectOnlineNumbers: false,
		mouseWheelZoom: true,	// 鼠标滚轮缩放
		showUnused: true,	// 显示未使用的代码
	})
})
</script>

<template>
	<div ref="editorRef"></div>
</template>

<style lang="scss" scoped>
div {
	overflow: hidden;
}
</style>