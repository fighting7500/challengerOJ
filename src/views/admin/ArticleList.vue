<!--
 * @Author: 17197
 * @Date: 2024/4/4
 * @Description: ArticleList.vue
 * @Version: 1.0
 * @Last Modified time : 2024/4/4
-->
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiGetArticleList, apiDeleteArticle } from '@/api/article.js'
import { apiUpdateArticleStatus } from '@/api/admin.js'
import { Message, Modal } from '@arco-design/web-vue'
import { useWindowHeight, useTimeFormat } from '@/utils/composables.js'

const router = useRouter()
const query = reactive({
	articleName: '',
	admin: 1
})
const articleList = ref([])
const loading = ref(false)
const scroll = {
	y: useWindowHeight(120),
	x: '110%'
}
const pagination = ref({
	pageSize: 20,
	current: 1,
	total: 0,
	showTotal: true,
	showPageSize: true,
	pageSizeOptions: [10, 20, 50, 100],
	showJumper: true
})
const columns = [
	{ title: '文章ID', dataIndex: 'id', key: 'id', width: 100, align: 'center', fixed: 'left' },
	{ title: '文章名称', dataIndex: 'title', key: 'title', fixed: 'left', ellipsis: true, tooltip: true },
	{ title: '作者', dataIndex: 'username', key: 'username', width: 150, align: 'center' },
	{ title: '分类', dataIndex: 'category', key: 'category', align: 'center' },
	{ title: '状态', dataIndex: 'status', key: 'status', slotName: 'status', width: 100, align: 'center' },
	{ title: '创建时间', dataIndex: 'create_time', key: 'create_time', width: 200, align: 'center' },
	{ title: '发布时间', dataIndex: 'publish_time', key: 'publish_time', width: 200, align: 'center' },
	{ title: '操作', key: 'action', slotName: 'action', width: 250, align: 'center', fixed: 'right' }
]

const search = async () => {
	loading.value = true
	const res = await apiGetArticleList({
		...query,
		pageNum: pagination.value.current,
		pageSize: pagination.value.pageSize
	})
	if (res.status !== 200) {
		Message.error(res.message)
		return
	}
	articleList.value = res.data.Rows
	articleList.value.forEach((item) => {
		item.create_time = useTimeFormat(item.create_time)
		item.publish_time = useTimeFormat(item.publish_time)
	})
	pagination.value.total = res.data.total
	loading.value = false
}
const reset = () => {
	query.articleName = ''
	query.status = ''
	search()
}
const pageChange = (page) => {
	pagination.value.current = page
	search()
}
const pageSizeChange = (pageSize) => {
	pagination.value.current = 1
	pagination.value.pageSize = pageSize
	search()
}
const editor = (record) => {
	router.push({
		path: '/admin/article/editor',
		query: {
			id: record.id
		}
	})
}
const updateArticleStatus = async (record, status) => {
	const res = await apiUpdateArticleStatus({
		id: record.id,
		status
	})
	if (res.status !== 200) {
		Message.error(res.message)
		return
	}
	Message.success('发布成功')
	await search()
}
const deleteArticle = (record) => {
	Modal.confirm({
		title: '删除文章',
		content: '确定删除该文章吗？',
		onOk: async () => {
			const res = await apiDeleteArticle({ id: record.id })
			if (res.status !== 200) {
				Message.error(res.message)
				return
			}
			Message.success('删除成功')
			await search()
		}
	})
}
onMounted(() => {
	search()
})
</script>

<template>
	<div id="container">
		<a-row :gutter="16">
			<a-col :span="5">
				<a-input v-model="query.articleName" placeholder="输入文章名称" @press-enter="search" @clear="search" :allow-clear="true">
					<template #prepend>文章名称</template>
				</a-input>
			</a-col>
			<a-col :span="4">
				<a-select placeholder="请选择" v-model="query.status" :trigger-props="{ autoFitPopupMinWidth: true }" :allow-clear="true" @change="search">
					<template #prefix>发布状态</template>
					<a-option value="publish">发布</a-option>
					<a-option value="medium">审核中</a-option>
					<a-option value="hard">审核未通过</a-option>
				</a-select>
			</a-col>
			<!--<a-col :span="4">-->
			<!--	<a-select placeholder="请选择" v-model="query.categoryId" :trigger-props="{ autoFitPopupMinWidth: true }" :allow-clear="true" @change="search">-->
			<!--		<template #prefix>分类</template>-->
			<!--		<a-option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</a-option>-->
			<!--	</a-select>-->
			<!--</a-col>-->
			<a-col :span="4">
				<a-space>
					<a-button type="primary" @click="search">
						<template #icon>
							<icon-search />
						</template>
						搜索
					</a-button>
					<a-button @click="reset">
						<template #icon>
							<icon-refresh />
						</template>
						重置
					</a-button>
					<a-button type="primary" status="success">
						<template #icon>
							<icon-plus />
						</template>
						新增
					</a-button>
				</a-space>
			</a-col>
		</a-row>
		<a-table
			class="table"
			:data="articleList"
			:columns="columns"
			:loading="loading"
			:scroll="scroll"
			:pagination="pagination"
			@page-change="pageChange"
			@page-size-change="pageSizeChange"
			page-position="bl"
		>
			<template #status="{ record }">
				<a-tag v-if="record.status === '2'" color="green">已发布</a-tag>
				<a-tag v-else-if="record.status === '1'" color="gold">审核中</a-tag>
				<a-tag v-else-if="record.status === '0'" color="red">审核未通过</a-tag>
			</template>
			<template #action="{ record }">
				<a-space>
					<a-button type="primary" size="small" @click="editor(record)">编辑</a-button>
					<a-button type="primary" status="success" size="small" @click="updateArticleStatus(record, 1)" v-if="record.status === '1'">发布 </a-button>
					<a-button type="primary" status="danger" size="small" @click="updatePArticleStatus(record, 0)" v-else-if="record.status === '2'">取消发布 </a-button>
					<a-button size="small" status="danger" @click="deleteArticle(record)">删除</a-button>
				</a-space>
			</template>
		</a-table>
	</div>
</template>

<style scoped lang="scss">
.table {
	margin-top: 20px;
}
</style>
