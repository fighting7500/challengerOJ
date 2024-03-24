<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const id = route.params.id;
const title = ref('promotion detail');
console.log(id);
const backgroundUrl = ref('https://assets.leetcode.cn/aliyun-lc-upload/leetbook/cover/210129023942/%E5%B9%BF%E5%BA%A6%E4%BC%98%E5%85%88%E6%90%9C%E7%B4%A2.jpg');
const background = ref(null);
onMounted(() => {
	background.value.style.setProperty('--background-url', `url(${backgroundUrl.value})`);
});
</script>

<template>
	<div ref="background" class="back-ground-container">
		<div class="container">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item to="/learn">学习</el-breadcrumb-item>
				<el-breadcrumb-item to="/learn">{{ title }}</el-breadcrumb-item>
			</el-breadcrumb>
			<el-row :gutter="20" style="margin-top: 40px;">
				<el-col :span="16">
					<el-row class="left-head">
						<el-col :span="6">
							<el-image style="width: 150px; height: 200px; border-radius: 8px;" :src="backgroundUrl"
								:fit="fit" :lazy="true"></el-image>
						</el-col>
						<el-col :span="18">
							<el-row>
								<h2>{{ title }}</h2>
							</el-row>
							<el-row>
								<span>描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</span>
							</el-row>
							<el-row style="align-items: flex-end;">
								<el-col :span="12">
									<el-button type="primary" size="medium">开始学习</el-button>
								</el-col>
								<el-col :span="12">
									<div></div>
									<div></div>
									<div></div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="8">23</el-col>
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
	inset: 0px;
	background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), var(--background-url);
	background-position: 50% 17%;
	opacity: 0.2;
	background-size: cover;
	filter: blur(20px);
	z-index: -1;
}

.container {
	width: 1200px;
	padding: 32px 90px;
	margin: 0px auto;
}

.left-head {
	margin-bottom: 54px;

	h2 {
		font-size: 22px;
		line-height: 32px;
		color: rgba(38, 38, 38, 1);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	span {
		font-size: 14px;
		flex: 1 1 auto;
		line-height: 24px;
		margin-top: 4px;
		/* 两行 */
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;

	}
}
</style>