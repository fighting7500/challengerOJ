<script setup>
import { ref, reactive, onMounted } from 'vue'
import { apiGetArticleList, apiGetReadList } from '@/api/article.js'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const query = reactive({
	articleName: ''
})
const dataSource = ref([])
const rankList = ref([])
const loading = ref(false)

const paginationProps = reactive({
	pageSize: 10,
	current: 1,
	total: 0,
	showTotal: true,
	showPageSize: true,
	pageSizeOptions: [10, 20, 50, 100],
	showJumper: true
})

const getDataSource = async () => {
	loading.value = true
	const res = await apiGetArticleList({
		...query,
		pageNum: paginationProps.current,
		pageSize: paginationProps.pageSize
	})
	if (res.status !== 200) {
		Message.error(res.message)
		return
	}
	dataSource.value = res.data.Rows
	paginationProps.total = res.data.total
	loading.value = false
}
const getReadList = async () => {
	loading.value = true
	const res = await apiGetReadList()
	if (res.status !== 200) {
		Message.error(res.message)
		return
	}
	rankList.value = res.data
	loading.value = false
}

const pageChange = (page) => {
	paginationProps.current = page
	getDataSource()
	// 滚动到顶部
	window.scrollTo(0, 0)
}

const pageSizeChange = (size) => {
	paginationProps.current = 1
	paginationProps.pageSize = size
	getDataSource()
	window.scrollTo(0, 0)
}

onMounted(() => {
	getDataSource()
	getReadList()
})

const toDetail = (item) => {
	// /:id
	router.push({
		path: `/article/${item.id}`
	})
}
</script>

<template>
	<div id="container">
		<a-row>
			<a-col :span="17">
				<a-list class="list-demo-action-layout" :bordered="false" :data="dataSource" :pagination-props="paginationProps" @page-change="pageChange" @page-size-change="pageSizeChange">
					<template #item="{ item }">
						<a-list-item class="list-demo-item" action-layout="vertical" @click="() => toDetail(item)">
							<template #actions>
								<span><icon-heart />{{ item.likes }}</span>
								<span><icon-star />{{ item.collections }}</span>
								<span><icon-message />{{ item.comments }}</span>
							</template>
							<!--                            <template #extra>-->
							<!--                                <div className="image-area">-->
							<!--                                    <img alt="arco-design" :src="item.imageSrc" />-->
							<!--                                </div>-->
							<!--                            </template>-->
							<a-list-item-meta :title="item.title" :description="item.description">
								<template #avatar>
									<a-avatar>
										<img alt="avatar" :src="item.avatar" />
									</a-avatar>
								</template>
							</a-list-item-meta>
						</a-list-item>
					</template>
				</a-list>
			</a-col>
			<a-col :span="6" :offset="1">
				<div class="ranking">
					<span>必读榜</span>
					<div class="ranking-item" v-for="(item, index) in rankList" :key="index" @click="() => toDetail(item)">
						<span class="index">{{ index + 1 }}</span>
						<div class="right">
							<div class="name">
								<img :src="item.avatar" alt="" />
								<span>{{ item.title }}</span>
							</div>
							<span class="description">{{ item.description }}</span>
						</div>
					</div>
				</div>
			</a-col>
		</a-row>
	</div>
	<a-back-top>
		<a-button shape="circle" size="large" style="box-shadow: 0 2px 12px #0000001a; border: 1px solid rgb(229, 230, 235)">
			<icon-up size="20" />
		</a-button>
	</a-back-top>
</template>

<style lang="scss" scoped>
#container {
	width: 1200px;
	padding: 32px 90px;
	margin: 0 auto;
}

.list-demo-action-layout .image-area {
	width: 183px;
	height: 119px;
	border-radius: 2px;
	overflow: hidden;
}

.list-demo-action-layout .list-demo-item {
	cursor: pointer;
	padding: 20px 0;
	background-color: #fff;
	border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
	width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
	margin: 0 4px;
}

.ranking {
	margin-top: 20px;
	padding: 10px;
	background-color: #fff;
	border-radius: 5px;
	// 阴影
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

	.ranking-item {
		// 标题和描述都是一行不换行
		display: flex;
		align-items: center;
		margin-top: 10px;

		.index {
			width: 30px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			margin-right: 10px;
		}

		.right {
			flex: 1 1 auto;
			min-width: 0;

			.name {
				display: flex;
				align-items: center;

				img {
					width: 30px;
					height: 30px;
					border-radius: 50%;
					margin-right: 10px;
				}

				span {
					font-size: 14px;
					line-height: 20px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					flex: 1 1 auto;
					font-weight: 500;
				}
			}

			.description {
				display: block;
				font-size: 12px;
				line-height: 20px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				height: 20px;
				color: rgba(60, 60, 67, 0.3);
			}
		}

		&:hover {
			cursor: pointer;
			background-color: #f5f5f5;
		}
	}
}
</style>
