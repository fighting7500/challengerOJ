<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const tabs = reactive([
	{ name: '精选', content: '精选内容' },
	{ name: '算法与数据结构', content: '算法与数据结构内容' },
	{ name: '前端', content: '前端内容' },
	{ name: 'java', content: 'Java内容' },
	{ name: 'python', content: 'Python内容' },
	{ name: '后端', content: '后端内容' },
	{ name: '数据库', content: '数据库内容' },
	{ name: '工具', content: '工具内容' },
	{ name: '其他', content: '其他内容' }
])

const currentTab = ref(0)
const titleList = reactive(['猜你喜欢', '最受关注', '模拟演练', '面试笔记'])
let tabContentList = reactive([])
tabContentList = [
	[
		{ title: '猜你喜欢1', desc: '描述1', section: 12, node: 66, views: 16632 },
		{ title: '猜你喜欢2', desc: '描述2', section: 12, node: 66, views: 16632 },
		{ title: '猜你喜欢2', desc: '描述2', section: 12, node: 66, views: 16632 },
		{ title: '猜你喜欢2', desc: '描述2', section: 12, node: 66, views: 16632 },
		{ title: '猜你喜欢2', desc: '描述2', section: 12, node: 66, views: 16632 },
		{ title: '猜你喜欢2', desc: '描述2', section: 12, node: 66, views: 16632 },
		{ title: '猜你喜欢2', desc: '描述2', section: 12, node: 66, views: 16632 },
		{ title: '猜你喜欢2', desc: '描述2', section: 12, node: 66, views: 16632 },
		{ title: '猜你喜欢2', desc: '描述2', section: 12, node: 66, views: 16632 },
		{ title: '猜你喜欢2', desc: '描述2', section: 12, node: 66, views: 16632 },
		{ title: '猜你喜欢2', desc: '描述2', section: 12, node: 66, views: 16632 },
		{ title: '猜你喜欢2', desc: '描述2', section: 12, node: 66, views: 16632 },
		{ title: '猜你喜欢2', desc: '描述2', section: 12, node: 66, views: 16632 },
		{ title: '猜你喜欢2', desc: '描述2', section: 12, node: 66, views: 16632 },
		{ title: '猜你喜欢2', desc: '描述2', section: 12, node: 66, views: 16632 },
		{ title: '猜你喜欢2', desc: '描述2', section: 12, node: 66, views: 16632 },
		{ title: '猜你喜欢2', desc: '描述2', section: 12, node: 66, views: 16632 },
		{ title: '猜你喜欢2', desc: '描述2', section: 12, node: 66, views: 16632 }
	],
	[
		{ title: '最受关注1', desc: '描述1', section: 12, node: 66, views: 16632 },
		{ title: '最受关注2', desc: '描述2', section: 12, node: 66, views: 16632 }
	],
	[
		{ title: '模拟演练1', desc: '描述1', section: 12, node: 66, views: 16632 },
		{ title: '模拟演练2', desc: '描述2', section: 12, node: 66, views: 16632 }
	],
	[
		{ title: '面试笔记1', desc: '描述1', section: 12, node: 66, views: 16632 },
		{ title: '面试笔记2', desc: '描述2', section: 12, node: 66, views: 16632 }
	]
]
const count = reactive(Array(titleList.length).fill(6))
const loadMore = (index) => {
	count[index] += 6
}

const getDetail = (item) => {
	router.push({ name: 'detail', params: { id: item.title } })
}

const images = reactive([
	'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
	'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
	'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
	'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp'
])
const handleChange = (val) => {
	console.log(val)
}
</script>

<template>
	<div class="head-content">
		<a-carousel :style="{ width: '100%', height: '300px' }" :default-current="2" @change="handleChange" animation-name="card" indicator-type="slider" indicator-position="outer">
			<a-carousel-item :style="{ width: '60%' }" v-for="(image, index) in images" :key="index">
				<img :src="image" :style="{ width: '100%' }" alt="" />
			</a-carousel-item>
		</a-carousel>
	</div>
	<div class="container">
		<!-- tab -->
		<div class="tabs">
			<div class="tab" v-for="(tab, index) in tabs" :key="index" @click="currentTab = index" :class="{ active: index === currentTab }">
				<span>{{ tab.name }}</span>
			</div>
		</div>
		<!-- 内容 -->
		<div class="content">
			<div class="category" v-for="(tabItem, index) in titleList" :key="index">
				{{ tabItem }}
				<div class="moduleContainer">
					<div class="module" v-for="(item, i) in tabContentList[index].slice(0, count[index])" :key="i" @click="() => getDetail(item)">
						<div class="moduleContent">
							<div class="img">
								<img style="width: 100%; height: 100%; border-radius: 8px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fill" />
							</div>
							<div class="module-right">
								<div class="moduleTitle">{{ item.title }}</div>
								<div class="moduleDesc">{{ item.desc }}</div>
								<!-- 章节 观看人数 -->
								<div class="bottom">
									<span>{{ item.section }}章</span>
									<span> · </span>
									<span>{{ item.node }}节</span>
									<text><i class="iconfont icon-yanjing"></i>{{ item.views }}</text>
								</div>
							</div>
						</div>
					</div>
					<div class="view-more" v-if="count[index] < tabContentList[index].length">
						<div class="button" @click="loadMore(index)">加载更多</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<a-back-top>
		<a-button shape="circle" size="large" style="box-shadow: 0 2px 12px #0000001a; border: 1px solid rgb(229, 230, 235)">
			<icon-up size="20" />
		</a-button>
	</a-back-top>
</template>

<style lang="scss" scoped>
.head-content {
	width: 1200px;
	min-height: 280px;
	margin: 0 auto;
	margin-top: 20px;
	text-align: center;
}

.content-center {
	flex: 1;
	margin-left: 20px;
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
		cursor: pointer;
		transition: all 0.3s;

		&:hover {
			// 往上偏移
			transform: translateY(-4px);
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
		}

		.img {
			flex: 2;
			padding: 8px;
			box-sizing: border-box;
		}

		.module-right {
			flex: 7;
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

	.view-more {
		width: 100%;

		.button {
			background-color: rgba(0, 0, 0, 0.05);
			border-radius: 8px;
			width: 182px;
			height: 32px;
			line-height: 32px;
			text-align: center;
			font-size: 14px;
			font-weight: 400;
			margin: auto;
			cursor: pointer;
		}
	}
}
</style>
