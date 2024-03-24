<script setup lang="ts">
import { ref } from 'vue'
import Header from './components/header.vue'
import md from './components/README.md?raw'
import CodeEditor from '../../components/codeEditor.vue'

const leftPaneWidth = ref(610)
const resize = ref(null)
const rightHeadHeight = ref(400)
const resizeRight = ref(null)

const onMouseDown = (e: MouseEvent) => {
	const startX = e.clientX
	const left = resize.value.offsetLeft
	const box = resize.value.parentElement
	const maxT = box.offsetWidth - resize.value.offsetWidth
	document.onmousemove = (e: MouseEvent) => {
		const endX = e.clientX
		let moveLen = left + (endX - startX)
		if (moveLen < 200) moveLen = 200
		if (moveLen > maxT - 150) moveLen = maxT - 150
		resize.value.style.left = `${moveLen}px`
		leftPaneWidth.value = moveLen
	}
	document.onmouseup = () => {
		document.onmousemove = null
		document.onmouseup = null
	}
}

const onMouseDownRight = (e: MouseEvent) => {
	const startY = e.clientY
	const top = resizeRight.value.offsetTop
	const box = resizeRight.value.parentElement
	const maxT = box.offsetHeight - resizeRight.value.offsetHeight
	document.onmousemove = (e: MouseEvent) => {
		const endY = e.clientY
		let moveLen = top + (endY - startY)
		if (moveLen < 200) moveLen = 200
		if (moveLen > maxT - 150) moveLen = maxT - 150
		resizeRight.value.style.top = `${moveLen}px`
		rightHeadHeight.value = moveLen
	}
	document.onmouseup = () => {
		document.onmousemove = null
		document.onmouseup = null
	}
}

const activeName = ref('first')
const text = ref(md)

const language = ref('javascript')
const languageList = [
	{ value: 'javascript', label: 'JavaScript' },
	{ value: 'python', label: 'Python' },
	{ value: 'java', label: 'Java' },
	{ value: 'c', label: 'C' },
	{ value: 'c++', label: 'C++' },
]
const handleClick = (tab: any) => {
	console.log(tab)
}

const activeNameRight = ref('first')
</script>

<template>
	<el-container class="container">
		<Header ref="header" style="position: relative;"/>
		<el-main class="box">
			<!-- 左边 -->
			<div class="left" :style="{ width: `${leftPaneWidth}px` }">
				<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
					<el-tab-pane name="first" class="tab-pane">
						<template #label>
							<i class="iconfont icon-timu"></i>
							<span>题目描述</span>
						</template>
						<v-md-preview :text="text" preview-class="vuepress-markdown-body"></v-md-preview>
					</el-tab-pane>
					<el-tab-pane name="second" class="tab-pane">
						<template #label>
							<i class="iconfont icon-tijie"></i>
							<span>题解</span>
						</template>
					</el-tab-pane>
					<el-tab-pane name="third" class="tab-pane">
						<template #label>
							<i class="iconfont icon-jilu"></i>
							<span>提交记录</span>
						</template>
					</el-tab-pane>
				</el-tabs>
			</div>
			<div class="resize" ref="resize" @mousedown="onMouseDown"></div>
			<div class="right" :style="{ width: `calc(100% - 8px - ${leftPaneWidth}px)` }">
				<!-- 代码区 -->
				<div class="right-head" :style="{ height: `${rightHeadHeight}px` }">
					<div class="code-head">
						<!-- 语言选择 -->
						<el-select v-model="language" placeholder="Select" style="width: 120px">
							<el-option v-for="item in languageList" :key="item.value" :label="item.label"
								:value="item.value" />
						</el-select>
					</div>
					<CodeEditor class="code-editor" />
					<!-- 代码区底部 -->
					<div class="footer">
						<div class="footer-left">
							<span>50行</span>
							<span>64列</span>
							<span>已存储到本地</span>
						</div>
						<div>
							<el-button>运行</el-button>
							<el-button type="primary">提交</el-button>
						</div>
					</div>
				</div>
				<div ref="resizeRight" class="right-resize" @mousedown="onMouseDownRight"></div>
				<div class="right-footer" :style="{ height: `calc(100% - 8px - ${rightHeadHeight}px)` }">
					<el-tabs v-model="activeNameRight" class="demo-tabs" @tab-click="handleClick">
						<el-tab-pane name="first" class="tab-pane">
							<template #label>
								<i class="iconfont icon-timu"></i>
								<span>测试用例</span>
							</template>
							<span>测试用例</span>
						</el-tab-pane>
						<el-tab-pane name="second" class="tab-pane">
							<template #label>
								<i class="iconfont icon-tijie"></i>
								<span>测试结果</span>
							</template>
							<span>测试结果</span>
						</el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<style lang="scss" scoped>
.container {
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
}

.box {
	flex: 1;
	height: 0;
	display: flex;
	padding: 10px;
	background-color: #f0f0f0;
}

.resize {
	margin: 0 3px;
	width: 2px;
	height: 100%;
	/* color: #dddddd; */
	cursor: ew-resize;
	box-sizing: border-box;
	border-radius: 5px;
	/* display: flex;
	justify-content: center;
	align-items: center; */

	&:hover {
		background-color: #007aff;
	}

	&:active {
		background-color: #007aff;
	}

	/* &::after {
		background-color: #00000014;
		border-radius: 2px;
		content: "";
		height: 20px;
		left: 421px;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 2px;
	} */
}

.left {
	height: 100%;
	border-radius: 10px;
	background-color: #fff;
	padding-bottom: 20px;

	.demo-tabs {
		// padding-left: 20px;
		height: 100%;
		display: flex;
    	flex-direction: column;
		.tabpane {
			padding: 0;
		}
	}
}

.right {
	height: 100%;
}

.right-resize {
	margin: 3px 0;
	width: 100%;
	height: 2px;
	cursor: ns-resize;
	box-sizing: border-box;
	border-radius: 2px;

	&:hover {
		background-color: #317ff4;
	}

	&:active {
		background-color: #317ff4;
	}
}

.right-head {
	padding: 10px;
	display: flex;
	flex-direction: column;
	border-radius: 10px;
	background-color: #fff;
	.code-head {
		padding: 10px;
	}
	.code-editor {
		flex: 1;
		padding: 10px;
		position: relative;
		&::before {
			// 边框,使用缩放
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border: 1px solid #e4e7ed;
		}
	}
	.footer {
		padding-top: 10px;
		margin-left: 10px;
		display: flex;
		justify-content: space-between;
		.footer-left {
			display: flex;
			font-size: 14px;
			color: #00000057;
			span {
				margin-right: 10px;
			}
		}
	}
}

.right-footer {
	border-radius: 10px;
	background-color: #fff;
}
</style>
