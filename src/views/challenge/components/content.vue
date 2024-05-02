<!--
 * @Author: 17197
 * @Date: 2024/3/28
 * @Description: content.vue
 * @Version: 1.0
 * @Last Modified time : 2024/3/28
-->
<script setup>
import { ref, onMounted, watch } from 'vue'
import QuestionAnswer from './QuestionAnswer.vue'
import SubmitRecord from './SubmitRecord.vue'
import CodeEditor from '@/components/codeEditor.vue'
import TestResult from '@/views/challenge/components/TestResult.vue'
import { apiGetProblemDetail } from '@/api/question.js'
import { Message } from '@arco-design/web-vue'
import Comment from './comment.vue'
import CommentList from '../../../components/CommentList.vue'

const language = ref('javascript')
const languageList = [
	{ value: 'javascript', label: 'JavaScript' },
	{ value: 'python', label: 'Python' },
	{ value: 'java', label: 'Java' },
	{ value: 'c', label: 'C' },
	{ value: 'c++', label: 'C++' }
]
const text = ref('')
const prop = defineProps(['problemId'])
// prop变化时重新获取题目详情
watch(
	() => prop.problemId,
	() => {
		getProblemDetail()
	}
)
const getProblemDetail = async () => {
	const res = await apiGetProblemDetail(prop.problemId)
	if (res.status !== 200) {
		Message.error(res.msg)
		return
	}
	text.value = '# ' + res.data.problem.name + '\n' + res.data.problem_details.content
}

onMounted(() => {
	getProblemDetail()
})
</script>

<template>
	<a-split class="split" min="400" max="1400">
		<!--左边-->
		<template #first>
			<a-typography-paragraph>
				<a-tabs type="text" size="large" class="left-tabs">
					<a-tab-pane key="1" title="题目描述" class="tabs-item">
						<template #title> <i class="iconfont icon-timu"></i> 题目描述 </template>
						<div class="question">
							<a-scrollbar style="height: 85vh; overflow: auto">
								<v-md-preview :text="text"></v-md-preview>
								<div class="comment">
									<comment />
								</div>
								<div class="comment-tips">
									<h3>
										<icon-font type="icon-tishi" :size="16" />
										讨论区规则
									</h3>
									<span></span>
									<span>1. 请不要在评论区发表题解！</span>
									<span>2. 评论区可以发表关于对翻译的建议、对题目的疑问及其延伸讨论。</span>
									<span>3. 如果你需要整理题解思路，获得反馈从而进阶提升，可以去题解区进行。</span>
								</div>
								<div class="comment-list">
									<comment-list />
								</div>
							</a-scrollbar>
						</div>
					</a-tab-pane>
					<a-tab-pane key="2" title="Tab 2">
						<template #title> <i class="iconfont icon-daanjiexi"></i> 题解 </template>
						<question-answer />
					</a-tab-pane>
					<a-tab-pane key="3" title="Tab 3">
						<template #title> <i class="iconfont icon-jilu" /> 提交记录 </template>
						<submit-record />
					</a-tab-pane>
				</a-tabs>
			</a-typography-paragraph>
		</template>
		<!--分隔条-->
		<template #resize-trigger-icon>
			<span class="trigger"></span>
		</template>
		<!--右边-->
		<template #second>
			<div style="flex: 1">
				<a-split direction="vertical" class="right" default-size="500" min="150" max="600">
					<!--右上-->
					<template #first>
						<a-typography-paragraph>
							<div class="right-top">
								<header><i class="iconfont icon-code"></i>代码</header>
								<div class="option">
									<a-select v-model="language" :style="{ width: '120px' }" :bordered="false">
										<a-option v-for="item of languageList" :value="item.value" :label="item.label" :key="item.value" />
									</a-select>
									<icon-refresh size="20" />
								</div>
								<code-editor style="flex: 1" />
								<div class="right-top-footer">
									<a-button type="text">运行</a-button>
									<a-button type="primary" class="submit">提交</a-button>
								</div>
							</div>
						</a-typography-paragraph>
					</template>
					<!--分隔条-->
					<template #resize-trigger-icon>
						<span class="trigger-right"></span>
					</template>
					<!--右下-->
					<template #second>
						<a-typography-paragraph>
							<a-tabs type="text" size="large">
								<a-tab-pane key="1" title="测试用例">
									<template #title> <i class="iconfont icon-ceshi"></i> 测试用例 </template>
									<div class="test-record">
										<code-editor style="height: 100%" />
									</div>
								</a-tab-pane>
								<a-tab-pane key="2" title="测试结果">
									<template #title> <i class="iconfont icon-jieguo"></i> 测试结果 </template>
									<test-result />
								</a-tab-pane>
							</a-tabs>
						</a-typography-paragraph>
					</template>
				</a-split>
			</div>
		</template>
	</a-split>
</template>

<style scoped lang="scss">
.split {
	height: 100%;
	box-sizing: border-box;
}
.left-tabs {
	height: 100%;
}
.right {
	height: calc(100vh - 58px);
}
.trigger {
	width: 10px;
	&:before {
		content: '';
		display: block;
		width: 5px;
		height: 25px;
		background-color: #dddddd;
		border-radius: 5px;
		margin: 0 auto;
	}
}
.trigger-right {
	height: 10px;
	position: relative;
	&:before {
		content: '';
		display: block;
		width: 25px;
		height: 5px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: #dddddd;
		border-radius: 5px;
	}
}
.right-top {
	padding: 5px 20px;
	display: flex;
	height: 100%;
	flex-direction: column;
	header {
		display: flex;
		align-items: center;
	}
	.option {
		color: #737373;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.code-editor {
		flex: 1;
	}
	.right-top-footer {
		text-align: right;
		.submit {
			margin-left: 20px;
		}
	}
}
.icon-code {
	color: #02b128;
	font-weight: 500;
	font-size: 20px;
	margin-right: 5px;
}
.test-record {
	height: 180px;
}

.comment {
	margin: 20px 30px;
	padding-bottom: 10px;
	border-radius: 8px;
	box-shadow:
		0 0 #0000,
		0 0 #0000,
		0 1px 3px #0000000a,
		0 2px 8px #00000014;
}

.comment-tips {
	margin: 20px 30px;
	padding: 10px;
	border: 1px solid #e8e8e8;
	border-radius: 8px;
	background-color: #f5f5f5;

	span {
		display: block;
		margin-bottom: 10px;
	}
}

.comment-list {
	margin: 20px 30px;
	padding: 10px;
}
</style>
