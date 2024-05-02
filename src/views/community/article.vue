<!--
 * @Author: 17197
 * @Date: 2024-05-02 13:29:34
 * @Description: article.vue
 * @Version: 1.0
 * @Last Modified time : 2024-05-02 13:29:34
-->
<script setup>
import { ref, onMounted } from 'vue'
import { apiDeleteArticle, apiGetArticleDetail } from '@/api/article.js'
import { useRoute } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import { useTimeFormat } from '../../utils/composables.js'
import router from '@/router/index.js'
import Comment from '@/views/challenge/components/comment.vue'
import CommentList from '@/components/CommentList.vue'

const route = useRoute()

const articleId = route.params.id
// 文章详情
const articleDetail = ref({})
// 获取文章详情
const getArticleDetail = async () => {
	const res = await apiGetArticleDetail(articleId)
	if (res.status !== 200) {
		Message.error(res.message)
		return
	}
	articleDetail.value = res.data
}
onMounted(() => {
	getArticleDetail()
})

const handleSelect = (key) => {
	switch (key) {
		case 'delete':
			Message.confirm({
				title: '删除文章',
				content: '确定删除该文章吗？',
				onOk: async () => {
					const res = await apiDeleteArticle(articleId)
					if (res.status !== 200) {
						Message.error(res.message)
						return
					}
					Message.success('删除成功')
					router.push('/community')
				}
			})
			break
		case 'editor':
			router.push(`/community/editor/${articleId}`)
			break
		case 'report':
			Message.info('举报成功')
			break
		default:
			break
	}
}
</script>

<template>
	<div id="articleContainer">
		<a-breadcrumb>
			<a-breadcrumb-item style="cursor: pointer" @click="router.push('/community')">社区</a-breadcrumb-item>
			<a-breadcrumb-item class="breadcrumb-title">{{ articleDetail.title }}</a-breadcrumb-item>
		</a-breadcrumb>
		<a-divider :margin="10" />
		<a-row align="center">
			<a-col :span="1">
				<a-avatar :imageUrl="articleDetail.avatar"></a-avatar>
			</a-col>
			<a-col :span="20">
				<h2>{{ articleDetail.title }}</h2>
				<div class="description" style="margin-top: 10px">{{ articleDetail.username }} {{ ' · ' + useTimeFormat(articleDetail.publish_time) }} {{ ' · 发布于' }}</div>
			</a-col>
		</a-row>
		<v-md-preview :text="articleDetail.content"></v-md-preview>
		<a-divider :margin="10" />
		<a-row justify="space-between" class="footer">
			<a-col :span="12" class="footer-left">
				<a-space size="large">
					<div class="likes flex">
						<icon-heart class="icon" :size="26" />
						<icon-heart-fill class="icon red" :size="26" />
						{{ articleDetail.likes }}
					</div>
					|
					<div class="collection flex">
						<icon-star class="icon" :size="26" />
						<icon-star-fill class="icon yellow" :size="26" />
						{{ articleDetail.collections }}
					</div>
					<a-dropdown @select="handleSelect" trigger="hover">
						<div class="more">···</div>
						<template #content>
							<a-doption value="delete">删除</a-doption>
							<a-doption value="editor">编辑</a-doption>
							<a-doption value="report">举报</a-doption>
						</template>
					</a-dropdown>
				</a-space>
			</a-col>
			<a-col :span="12" style="text-align: right"></a-col>
		</a-row>
	</div>
	<div id="articleContainer">
		<comment />
	</div>
	<div id="articleContainer">
		<comment-list />
	</div>
	<a-back-top>
		<a-button shape="circle" size="large" style="box-shadow: 0 2px 12px #0000001a; border: 1px solid rgb(229, 230, 235)">
			<icon-up size="20" />
		</a-button>
	</a-back-top>
</template>

<style scoped lang="scss">
#articleContainer {
	width: 1200px;
	padding: 10px;
	margin: 0 auto;
	margin-top: 20px;
	background-color: #fff;
	border-radius: 10px;
}

:deep .breadcrumb-title {
	max-width: 200px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.description {
	color: #999;
}

.flex {
	display: flex;
	align-items: center;
}

.footer {
	margin: 0 20px;

	.footer-left {
		display: flex;
		align-items: center;
		color: rgba(60, 60, 67, 0.6);

		.red {
			color: #ff4d4f;
		}

		.yellow {
			color: #ffc107;
		}

		.icon {
			margin-right: 5px;
		}

		.likes:hover {
			color: #ff4d4f;
		}

		.collection:hover {
			color: #ffc107;
		}

		.more {
			cursor: pointer;

			&:hover {
				color: #1a96ff;
			}
		}
	}
}
</style>
