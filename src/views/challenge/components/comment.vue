<!--
 * @Author: 17197
 * @Date: 2024-04-15 14:18:56
 * @Description: comment.vue
 * @Version: 1.0
 * @Last Modified time : 2024-04-15 14:18:56
-->
<script setup>
import { ref } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const EditorRef = ref(null)
const changePreview = () => {
	EditorRef.value?.togglePreview()
}
const commentValue = ref('')
const toolbars = ['code', 'link']
</script>

<template>
	<MdEditor style="height: auto; border: initial" v-model="commentValue" :toolbars="toolbars" placeholder="请输入评论..." :footers="[]" autoDetectCode :preview="false" ref="EditorRef" />
	<div class="commentBtn">
		<a-space>
			<a-button type="text" status="success" @click="changePreview">预览</a-button>
			<a-button type="primary" status="success">评论</a-button>
		</a-space>
	</div>
</template>

<style scoped lang="scss">
:deep .md-editor-toolbar-wrapper {
	border: initial;
}

.commentBtn {
	display: flex;
	justify-content: flex-end;
	margin-right: 10px;
}
</style>
