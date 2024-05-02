<!--
 * @Author: 17197
 * @Date: 2024-04-15 15:57:19
 * @Description: CommentList.vue
 * @Version: 1.0
 * @Last Modified time : 2024-04-15 15:57:19
-->
<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/userStore.js'

const userInfo = useUserStore().userInfo
const userAvatar = userInfo.avatar
const comment = ref('')
const subComment = ref('')
// 主评论
const isMainComment = ref(false)
// 子评论
const isSubComment = ref(false)
const commentList = ref([
	{
		id: 1,
		userName: '17197',
		user_id: 1,
		avatar: 'https://avatars.githubusercontent.com/u/59856091?v=4',
		content: '这是一条评论',
		time: '2024-04-15 15:57:19',
		like: 12,
		isLike: true,
		location: '湖北-武汉',
		isShowSubComment: false,
		subComment: [
			{
				id: 1,
				userName: '17197',
				user_id: 1,
				avatar: 'https://avatars.githubusercontent.com/u/59856091?v=4',
				content: '这是一条回复',
				time: '2024-04-15 15:57:19',
				like: 0,
				location: '武汉',
				isLike: false
			}
		]
	}
])
const total = ref(0)
// 点赞
const onLikeChange = (item) => {
	item.isLike = !item.isLike
	item.isLike ? item.like++ : item.like--
}

// 回复
const onReply = () => {
	isMainComment.value = !isMainComment.value
}

// 子评论回复
const onSubReply = () => {
	isSubComment.value = !isSubComment.value
}

// 取消评论
const cancelComment = () => {
	isMainComment.value = false
	comment.value = ''
}

// 评论
const mainComment = () => {
	console.log(comment.value)
}

// 取消子评论
const cancelSubComment = () => {
	isSubComment.value = false
	subComment.value = ''
}

// 子评论
const confirmSubComment = () => {
	console.log(subComment.value)
}

const deleteComment = (item) => {
	console.log(item.user_id)
}

// 展示子评论
const changeShowSubComment = (item) => {
	item.isShowSubComment = !item.isShowSubComment
}

const changePageNum = (num) => {
	console.log(num)
}
const sort = ref('new')
const changeSort = (type) => {
	sort.value = type
}
</script>

<template>
	<div style="display: flex; align-items: center">
		<span style="color: #86909c">排序：</span>
		<a-button type="text" v-if="sort === 'new'" @click="changeSort('hot')">
			<template #icon>
				<icon-swap :rotate="90" />
			</template>
			最新
		</a-button>
		<a-button type="text" v-if="sort === 'hot'" @click="changeSort('new')">
			<template #icon>
				<icon-swap :rotate="90" />
			</template>
			最热
		</a-button>
	</div>
	<!--主评论-->
	<a-comment :author="item.userName" :avatar="item.avatar" :content="item.content" v-for="item in commentList" :key="item.id" align="right">
		<template #datetime> 发布于 &nbsp; {{ item.location }} &nbsp; {{ item.time }}</template>
		<template #actions>
			<!--点赞-->
			<span class="action" key="heart" @click="onLikeChange(item)">
				<span v-if="item.isLike"><IconHeartFill :style="{ color: '#f53f3f' }" /></span>
				<span v-else><IconHeart /></span>
				{{ item.like }}
			</span>
			<!--评论-->
			<span class="action" @click="changeShowSubComment(item)"><IconMessage />{{ item.isShowSubComment ? '收起' : '展示' }}{{ item.subComment.length }}条回复</span>
			<!--回复-->
			<span class="action" key="reply" @click="onReply"> <icon-reply />回复</span>
			<!--删除-->
			<span class="action" v-if="item.user_id === userInfo.id" @click="deleteComment(item)"><icon-delete /></span>
		</template>
		<!--回复输入-->
		<a-comment align="right" :avatar="userAvatar" v-show="isMainComment">
			<template #actions>
				<a-button key="0" type="secondary" shape="round" @click="cancelComment"> 取消</a-button>
				<a-button key="1" type="primary" shape="round" @click="mainComment"> 评论</a-button>
			</template>
			<template #content>
				<a-input v-model="comment" placeholder="请输入评论..." />
			</template>
		</a-comment>
		<!--子评论-->
		<div v-if="item.isShowSubComment">
			<a-comment :author="subItem.userName" :avatar="subItem.avatar" :content="subItem.content" v-for="subItem in item.subComment" :key="subItem.id" align="right">
				<template #datetime> 发布于 &nbsp; {{ subItem.location }} &nbsp; {{ subItem.time }}</template>
				<template #actions>
					<!--点赞-->
					<span class="action" key="heart" @click="onLikeChange(subItem)">
						<span v-if="subItem.isLike"><IconHeartFill :style="{ color: '#f53f3f' }" /></span>
						<span v-else><IconHeart /></span>
						{{ subItem.like }}
					</span>
					<!--回复-->
					<span class="action" @click="onSubReply"> <icon-reply />回复 </span>
					<!--删除-->
					<span class="action" v-if="subItem.user_id === userInfo.id" @click="deleteComment(subItem)"><icon-delete /></span>
				</template>
				<!--回复输入-->
				<a-comment align="right" :avatar="userAvatar" v-show="isSubComment">
					<template #actions>
						<a-button key="0" type="secondary" shape="round" @click="cancelSubComment"> 取消</a-button>
						<a-button key="1" type="primary" shape="round" @click="confirmSubComment"> 评论</a-button>
					</template>
					<template #content>
						<a-input v-model="subComment" placeholder="请输入评论..." />
					</template>
				</a-comment>
			</a-comment>
			<!--展示更多和隐藏-->
			<div class="comment-footer">
				<span><a-link href="#" @click="showMore(item)" v-show="item.total >= item.subComment.length">展示更多</a-link></span>
				<span class="action" @click="item.isShowSubComment = false"><icon-up />&nbsp;隐藏</span>
			</div>
		</div>
	</a-comment>
	<!--分页-->
	<a-pagination :total="total" page-size="20" hide-on-single-page @change="changePageNum" />
</template>

<style scoped lang="scss">
.action {
	display: inline-block;
	padding: 0 4px;
	color: var(--color-text-1);
	line-height: 24px;
	background: transparent;
	border-radius: 2px;
	cursor: pointer;
	transition: all 0.1s ease;
}

.action:hover {
	background: var(--color-fill-3);
}

.comment-footer {
	display: flex;
	justify-content: space-between;
}

.arco-pagination {
	justify-content: center;
}
</style>
