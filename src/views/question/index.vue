<script setup>
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const id = route.params.id;
const title = ref('promotion detail');
const query = ref({
	source: '',
	level: '',
	status: '',
	tag: '',
});
const sourceList = reactive([
	{ value: '1', label: 'LeetCode' },
	{ value: '2', label: '牛客网' },
	{ value: '3', label: '力扣' },
	{ value: '4', label: 'CodeChallger' },
]);
const levelList = reactive([
	{ value: '1', label: '简单' },
	{ value: '2', label: '中等' },
	{ value: '3', label: '困难' },
]);
const statusList = reactive([
	{ value: '1', label: '未开始' },
	{ value: '2', label: '进行中' },
	{ value: '3', label: '已完成' },
]);
const tagList = reactive([
	{ value: '1', label: '数组' },
	{ value: '2', label: '字符串' },
	{ value: '3', label: '链表' },
	{ value: '4', label: '栈' },
	{ value: '5', label: '队列' },
	{ value: '6', label: '树' },
	{ value: '7', label: '图' },
	{ value: '8', label: '排序' },
	{ value: '9', label: '查找' },
	{ value: '10', label: '动态规划' },
	{ value: '11', label: '贪心' },
	{ value: '12', label: '回溯' },
	{ value: '13', label: '分治' },
	{ value: '14', label: '位运算' },
	{ value: '15', label: '数学' },
	{ value: '16', label: '设计' },
	{ value: '17', label: '模拟' },
	{ value: '18', label: '递归' },
	{ value: '19', label: '并查集' },
	{ value: '20', label: '图论' },
	{ value: '21', label: '拓扑排序' },
	{ value: '22', label: '最短路径' },
	{ value: '23', label: '最小生成树' },
	{ value: '24', label: '动态规划' },
	{ value: '25', label: '贪心' },
	{ value: '26', label: '回溯' },
	{ value: '27', label: '分治' },
	{ value: '28', label: '位运算' },
	{ value: '29', label: '数学' },
	{ value: '30', label: '设计' },
	{ value: '31', label: '模拟' },
	{ value: '32', label: '递归' },
	{ value: '33', label: '并查集' },
	{ value: '34', label: '图论' },
	{ value: '35', label: '拓扑排序' },
	{ value: '36', label: '最短路径' },
	{ value: '37', label: '最小生成树' },
	{ value: '38', label: '动态规划' },
	{ value: '39', label: '贪心' },
	{ value: '40', label: '回溯' },
	{ value: '41', label: '分治' },
	{ value: '42', label: '位运算' },
	{ value: '43', label: '数学' },
	{ value: '44', label: '设计' },
	{ value: '45', label: '模拟' },
	{ value: '46', label: '递归' },
	{ value: '47', label: '并查集' },
	{ value: '48', label: '图论' },
	{ value: '49', label: '拓扑排序' },
	{ value: '50', label: '最短路径' },
	{ value: '51', label: '最小生成树' },
]);
const isWrap = ref(false);
const tableData = reactive([
	{
		status: '未开始',
		name: '两数之和',
		anwser: '456',
		passRate: '45%',
		level: '简单',
		num: 928,
	},
	{
		status: '进行中',
		name: '两数之和',
		anwser: '456',
		passRate: '45%',
		level: '简单',
		num: 928,
	},
	{
		status: '已完成',
		name: '两数之和',
		anwser: '456',
		passRate: '45%',
		level: '简单',
		num: 928,
	},
	{
		status: '未开始',
		name: '两数之和',
		anwser: '456',
		passRate: '45%',
		level: '简单',
		num: 928,
	},
	{
		status: '进行中',
		name: '两数之和',
		anwser: '456',
		passRate: '45%',
		level: '简单',
		num: 928,
	},
	{
		status: '已完成',
		name: '两数之和',
		anwser: '456',
		passRate: '45%',
		level: '简单',
		num: 928,
	},
	{
		status: '未开始',
		name: '两数之和',
		anwser: '456',
		passRate: '45%',
		level: '简单',
		num: 928,
	},
	{
		status: '进行中',
		name: '两数之和',
		anwser: '456',
		passRate: '45%',
		level: '简单',
		num: 928,
	},
	{
		status: '已完成',
		name: '两数之和',
		anwser: '456',
		passRate: '45%',
		level: '简单',
		num: 928,
	}]);
</script>

<template>
	<div ref="background" class="back-ground-container">
		<div class="container">
			<el-row justify="space-between" align="middle">
				<el-col :span="8" class="head-left">
					<p>
						<b>编程闯关</b>
						<span>CodeChallger等你来战</span>
					</p>
				</el-col>
				<el-col :span="8" class="head-right">
					<img src="../../assets/challger.png"></img>
				</el-col>
			</el-row>
			<el-row class="content" justify="space-between">
				<el-col :span="18" class="content-left">
					<el-row justify="space-between" align="middle" class="content-left-head">
						<el-col :span="4">
							<p>闯关计划</p>
						</el-col>
						<el-col :span="2">
							<el-link class="link" type="primary" href="/challger/plan" :underline="false">查看更多</el-link>
						</el-col>
					</el-row>
					<el-row>
						<el-col class="card-group">
							<div class="card" v-for="(item, index) in 6" :key="index">
								<img src="https://assets.leetcode.cn/aliyun-lc-upload/study_plan_v2/top-interview-150/cover"
									alt="">
								<div class="card-right">
									<p>动态规划（基础版）</p>
									<div class="text">
										这是一个描述这是一个描述这是一个描述这是一个描述这是一个描述这是一个描述这是一个描述这是一个描述这是一个描述这是一个描述这是一个描述这是一个描述这是一个描述这是一个描述
									</div>
								</div>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col>
							<div class="tags">
								<div class="reactive" :style="{ flexWrap: isWrap ? 'wrap' : 'nowrap' }">
									<div class="tag" v-for="(index, item) in 50" :key="index"
										@click="() => getDetail(item)">
										<a href="">
											<span>数组</span>
											<span>928</span>
										</a>
									</div>
								</div>
								<div class="end" @click="() => isWrap = !isWrap">
									<span class="end-start"></span>
									<span class="end-end">
										<span>展开</span>
										<i class="iconfont"
											:class="isWrap ? 'icon-chevronsup' : 'icon-chevronsdown'"></i>
									</span>
								</div>
							</div>
						</el-col>
						<el-col style="display: flex; gap: 10px; margin-top: 10px;">
							<el-select v-model="query.source" placeholder="来源" style="width: 100px">
								<el-option v-for="item in sourceList" :key="item.value" :label="item.label"
									:value="item.value" />
							</el-select>
							<el-select v-model="query.level" placeholder="难度" style="width: 100px">
								<el-option v-for="item in levelList" :key="item.value" :label="item.label"
									:value="item.value" />
							</el-select>
							<el-select v-model="query.status" placeholder="状态" style="width: 100px">
								<el-option v-for="item in statusList" :key="item.value" :label="item.label"
									:value="item.value" />
							</el-select>
							<el-select v-model="query.tag" placeholder="标签" style="width: 100px">
								<el-option v-for="item in tagList" :key="item.value" :label="item.label"
									:value="item.value" />
							</el-select>
							<el-input v-model="input4" style="width: 160px" placeholder="搜索题目、编号" size="small">
								<template #prefix>
									<i class="iconfont icon-sousuo"></i>
								</template>
							</el-input>
						</el-col>
						<el-col style="display: flex; flex-direction: column; align-items: center;">
							<el-table class="table" :data="tableData" :stripe="true" style="width: 100%">
								<el-table-column prop="status" label="状态"/>
								<el-table-column prop="name" label="题目" width="180" align="left">
									<template #default="{ row }">
										<el-link :underline="false" :href="'/challenge?id=' + row.name">{{ row.name }}</el-link>
									</template>
								</el-table-column>
								<el-table-column prop="anwser" label="题解" />
								<el-table-column prop="passRate" label="通过率" />
								<el-table-column prop="level" label="难度" />
								<el-table-column prop="num" label="人数" />
							</el-table>
							<el-pagination background layout="prev, pager, next" :total="50"/>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="6" style="position: sticky; top: 20px;">
					<div class="analyst">
						<img src="../../assets/analyst.png">
						<div>
							<h3>我的刷题统计</h3>
						</div>
						<div class="analyst-flex">
							<div class="statistics">
								<div class="num">0</div>
								<div class="span">通过率(%)</div>
							</div>
							<div class="statistics">
								<div class="num">0</div>
								<div class="span">刷题数</div>
							</div>
							<div class="statistics">
								<div class="num">0</div>
								<div class="span">累计时长(h)</div>
							</div>
						</div>
					</div>
					<div class="ranking">
						<img src="../../assets/ranking.png">
						<div class="ranking-item" v-for="(item, index) in 10" :key="index">
							<span class="index">1</span>
							<span class="name">
								<img src="">
								<span>小明</span>
							</span>
							<span class="num">100题</span>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.back-ground-container {
	width: 100%;
	position: relative;
	z-index: 0;
	overflow: hidden;
}

.back-ground-container::before {
	transition: opacity 0.3s ease-out 0s;
}

.back-ground-container::before {
	content: "";
	height: 800px;
	position: absolute;
	// inset: 0px;
	// background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), var(--background-url);
	// background-position: 50% 17%;
	// opacity: 0.2;
	// background-size: cover;
	// filter: blur(20px);
	// z-index: -1;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-image: linear-gradient(to bottom, rgba(0, 255, 255, 0.289), rgb(255, 255, 255));
	opacity: 0.2;
	filter: blur(20px);
	z-index: -1;
}

.container {
	width: 1200px;
	padding: 32px 90px;
	margin: 0px auto;
}

.head-left {
	b {
		font-size: 30px;
		font-weight: 500;
		color: #000000;
		letter-spacing: 4px;
		margin-right: 20px;
	}

	span {
		font-size: 16px;
		color: #000000;
	}
}

.head-right {
	// width: 350px;
	height: 150px;

	img {
		width: 100%;
		height: 100%;
	}
}

.content {
	margin-top: 30px;

	p {
		font-size: 20px;
		font-weight: 500;
		color: #1a1a1abf;
	}

	.link {
		font-size: 14px;
	}

	.content-left-head {
		margin-bottom: 15px;
	}

	.card-group {
		display: flex;
		flex-wrap: wrap;
	}

	.card {
		width: 32%;
		height: 88px;
		padding: 5px;
		margin-right: 8px;
		margin-bottom: 20px;
		background-color: #fff;
		border-radius: 8px;
		display: flex;
		cursor: pointer;
		box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0px 2px 6px #0000000a, 0px 4px 8px #00000005, 0px 6px 12px #00000005;
		box-sizing: border-box;
		transition: all 0.3s;

		&:hover {
			// 往上偏移
			transform: translateY(-4px);
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
		}

		img {
			flex: 1;
			border-radius: 5px;
			box-sizing: border-box;
		}

		.card-right {
			flex: 4;
			padding: 8px;

			p {
				font-size: 14px;
				line-height: 20px;
				font-weight: 500;
			}

			.text {
				margin-top: 10px;
				color: #52525299;
				font-size: 12px;
				line-height: 16px;
				// 两行
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;

			}
		}
	}

	.card:nth-child(3n) {
		margin-right: 0;
	}
}

.tags {
	display: flex;
	width: 100%;
	position: relative;

	.reactive {
		overflow: hidden;
		display: flex;

		.tag {
			margin: 10px;
			margin-left: 0;
			display: flex;
			align-items: center;
			font-size: 14px;

			a {
				white-space: nowrap;
			}

			span:nth-child(2) {
				padding: 0 4px;
				margin-left: 5px;
				color: #3c3c4399;
				font-weight: 400;
				font-size: 12px;
				line-height: 16px;
				background-color: #000a200d;
				border-radius: 10px;
			}
		}
	}

	.end {
		position: absolute;
		right: 0;
		bottom: 10px;
		display: flex;
		align-self: flex-end;
		color: #3c3c4399;
		z-index: 1;

		.end-start {
			z-index: 2;
			width: 20px;
			height: 20px;
		}

		.end-end {
			height: 20px;
			font-weight: 400;
			display: flex;
			align-items: center;
			cursor: pointer;
			background-color: #f3f9fb;
		}
	}
}

.table {
	margin: 5px 0 20px;
	border-radius: 10px;
}

.analyst {
	padding: 20px;
	background-color: #fff;
	border-radius: 8px;
	position: relative;
	img {
		position: absolute;
		top: 10px;
		right: 0;
		width: 40%;
	}
	.analyst-flex {
		margin-top: 40px;
		display: flex;
		justify-content: space-between;
		.statistics {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.num {
			font-size: 18px;
		}
		.span {
			font-size: 12px;
		}
	}
}

.ranking {
	margin-top: 20px;
	padding: 10px;
	img {
		height: 18px;
	}
	.ranking-item{
		margin-top: 20px;
		display: flex;
		align-items: center;
		font-size: 16px;
		color: #5f6368;
		.index {
			width: 20px;
			text-align: center;
		}
		.name {
			flex: 1;
			margin-left: 20px;
			display: flex;
			align-items: center;
			font-size: 14px;
			img {
				width: 20px;
				height: 20px;
				border-radius: 50%;
				margin-right: 5px;
			}
		}
		.num {
			margin-left: 10px;
			font-size: 14px;
			font-weight: 600;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		}
	}
}
</style>