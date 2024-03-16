<script setup>
import { ref, reactive } from 'vue';

const tabs = reactive([
	{ name: "精选", content: "精选内容" },
	{ name: "算法与数据结构", content: "算法与数据结构内容" },
	{ name: "前端", content: "前端内容" },
	{ name: "java", content: "Java内容" },
	{ name: "python", content: "Python内容" },
	{ name: "后端", content: "后端内容" },
	{ name: "数据库", content: "数据库内容" },
	{ name: "工具", content: "工具内容" },
	{ name: "其他", content: "其他内容" },
])
const currentTab = ref(0)
const titleList = reactive(['猜你喜欢', '最受关注', '模拟演练', '面试笔记'])

</script>

<template>
	<div class="app">
		<div class="header">
			<div class="head-content">
				<div class="content-left">
					<h1>探索知识地图</h1>
					<span>通往编程高峰的必经之路</span>
				</div>
				<div class="content-center">22</div>
				<div>33</div>
			</div>
		</div>
		<div class="container">
			<!-- tab -->
			<div class="tabs">
				<div class="tab" v-for="(tab, index) in tabs" :key="index" @click="currentTab = index"
					:class="{ active: index === currentTab }">
					<span>{{ tab.name }}</span>
				</div>
			</div>
			<!-- 内容 -->
			<div class="content">
				<div class="category" v-for="(item, index) in titleList" :key="index">
					{{ item }}
					<div class="moduleContainer">
						<div class="module" v-for="i in 10" :key="i">
							<div class="moduleContent">
								<div class="img">
									<el-image style="width: 100%; height: 100%;border-radius: 8px;"
										src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
										fit="fill" />
								</div>
								<div class="module-right">
									<div class="moduleTitle">标题</div>
									<div class="moduleDesc">描述述描述述描述述描述述描述述描述述描述述描述述描述述描述述描述述描述述描述述</div>
									<!-- 章节 观看人数 -->
									<div class="bottom">
										<span>12章</span>
										<span> · </span>
										<span>66节</span>
										<text><i class="iconfont icon-yanjing"></i>16632</text>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.app {
	background-color: #f7f8fa;
}

.header {
	min-height: 280px;
	background-image: url('@/assets/banner.png');
	background-size: contain;

	.head-content {
		width: 1200px;
		min-height: 280px;
		margin: 0 auto;
		padding: 20px 0;
		display: flex;
		align-items: center;

		.content-left {
			h1 {
				font-size: 40px;
				font-weight: 500;
				line-height: 48px;
				margin-bottom: 16px;
			}

			span {
				font-size: 20px;
				color: rgba(26, 26, 26, 0.75);
				line-height: 28px;
			}
		}
	}

	.content-center {
		flex: 1;
		margin-left: 20px;
	}
}

.container {
	width: 1200px;
	margin: 0 auto;

	.tabs {
		display: flex;
		margin: 24px 0 40px 0;
		gap: 20px;

		.tab {
			padding: 10px 20px;
			cursor: pointer;
			border-radius: 8px;
		}

		.tab.active {
			background-color: rgba(0, 0, 0, 0.05);
		}

		.tab:hover {
			background-color: #eff0f2;
		}
	}

	.content {
		margin-top: 18px;
		margin-bottom: 100px;

		.category {
			font-size: 20px;
			font-weight: 500;
			color: rgb(38, 38, 38);
		}
	}
}

.moduleContainer {
	margin: 24px 0 40px;
	display: flex;
	flex-wrap: wrap;

	.module {
		width: 32%;
		margin-right: 20px;
		box-sizing: border-box;
	}

	.module:nth-child(3n) {
		margin-right: 0;
	}

	.moduleContent {
		height: 100px;
		background-color: #fff;
		border-radius: 8px;
		margin-bottom: 20px;
		display: flex;

		.img {
			flex: 1;
			padding: 8px;
			box-sizing: border-box;
		}

		.module-right {
			flex: 4;
			padding: 8px 0;

			.moduleTitle {
				font-size: 14px;
				font-weight: 500;
				line-height: 30px;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}

			.moduleDesc {
				width: 90%;
				font-size: 12px;
				line-height: 18px;
				color: rgba(60, 60, 67, 0.6);
				font-weight: 400;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.bottom {
				display: flex;
				align-items: center;
				font-size: 12px;
				line-height: 16px;
				color: rgba(60, 60, 67, 0.6);
				.iconfont {
					font-weight: 800;
					margin: 0 4px 0 8px;
				}
			}
		}
	}
}
</style>