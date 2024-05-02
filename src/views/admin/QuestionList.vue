<!--
 * @Author: 17197
 * @Date: 2024/4/4
 * @Description: QuestionList.vue
 * @Version: 1.0
 * @Last Modified time : 2024/4/4
-->
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiGetProblemList, apiCategories, apiGetSources } from '@/api/question.js'
import { apiUpdateProblemStatus, apiDeleteProblem } from '@/api/admin.js'
import { Message, Modal } from '@arco-design/web-vue'
import { useTimeFormat, useWindowHeight } from '@/utils/composables.js'

const router = useRouter()
const query = reactive({
	id: '',
	problemName: '',
	categoryId: '',
	difficulty: ''
})
const problemList = ref([])
const categoryList = ref([])
const sourceList = ref([])
const loading = ref(false)
const scroll = {
	y: useWindowHeight(120),
	x: '110%'
}
const pagination = {
	pageSize: 10,
	current: 1,
	total: 0,
	showTotal: true,
	showPageSize: true,
	pageSizeOptions: [10, 20, 50, 100],
	showJumper: true // 显示快速跳转
}
const columns = [
	{ title: '题目ID', dataIndex: 'id', key: 'id', width: 100, align: 'center', fixed: 'left' },
	{ title: '题目名称', dataIndex: 'name', key: 'name', width: 150, fixed: 'left', ellipsis: true, tooltip: true },
	{ title: '来源', dataIndex: 'source_id', key: 'source_id', slotName: 'source_id', width: 150, align: 'center' },
	{ title: '作者', dataIndex: 'author', key: 'author', width: 150, align: 'center' },
	{
		title: '分类',
		dataIndex: 'category_id',
		key: 'category_id',
		slotName: 'category_id',
		width: 150,
		align: 'center'
	},
	{ title: '难度', dataIndex: 'difficulty', key: 'difficulty', slotName: 'difficulty', width: 100, align: 'center' },
	{ title: '提交数', dataIndex: 'user_count', key: 'user_count', width: 100, align: 'center' },
	{ title: '通过率', dataIndex: 'pass_rate', key: 'pass_rate', width: 100, align: 'center' },
	{ title: '创建时间', dataIndex: 'created_at', key: 'created_at', width: 200, align: 'center' },
	{ title: '修改时间', dataIndex: 'updated_at', key: 'updated_at', width: 200, align: 'center' },
	{ title: '操作', key: 'action', slotName: 'action', width: 250, align: 'center', fixed: 'right' }
]
const getCategories = async () => {
	const res = await apiCategories({ admin: 1 })
	if (res.status !== 200) {
		Message.error(res.msg)
		return
	}
	categoryList.value = res.data
}
const getSources = async () => {
	const res = await apiGetSources()
	if (res.status !== 200) {
		Message.error(res.msg)
		return
	}
	sourceList.value = res.data
}

const search = () => {
	getProblemList()
}

const reset = () => {
	query.userID = ''
	query.problemName = ''
	query.categoryId = ''
	query.difficulty = ''
	getProblemList()
}

const getProblemList = async () => {
	loading.value = true
	const res = await apiGetProblemList({
		...query,
		pageSize: pagination.pageSize,
		pageNum: pagination.current
	})
	loading.value = false
	if (res.status !== 200) {
		Message.error(res.msg)
		return
	}
	problemList.value = res.data.Rows
	problemList.value.forEach((item) => {
		item.created_at = useTimeFormat(item.created_at)
		item.updated_at = useTimeFormat(item.updated_at)
	})
	pagination.total = res.data.total
}

const pageChange = (page) => {
	pagination.current = page
	getProblemList()
}

const pageSizeChange = (size) => {
	pagination.pageSize = size
	getProblemList()
}

const editor = (record) => {
	router.push({
		path: '/admin/edit-question/' + record.id
	})
}

// 更新题目状态
const updateProblemStatus = async (record, isUse) => {
	Modal.confirm({
		title: '提示',
		content: `确定${isUse === 1 ? '发布' : '取消发布'}该题目吗？`,
		onOk: async () => {
			const res = await apiUpdateProblemStatus({
				id: record.id,
				isUse
			})
			if (res.status !== 200) {
				Message.error(res.msg)
				return
			}
			Message.success('操作成功')
			await getProblemList()
		},
		onCancel: () => {
			Message.info('取消操作')
		}
	})
}

const deleteQuestion = (record) => {
	Modal.confirm({
		title: '提示',
		content: '确定删除该题目吗？',
		onOk: async () => {
			const res = await apiDeleteProblem({
				id: record.id
			})
			if (res.status !== 200) {
				Message.error(res.msg)
				return
			}
			Message.success('删除成功')
			await getProblemList()
		},
		onCancel: () => {
			Message.info('取消操作')
		}
	})
}
onMounted(() => {
	getCategories()
	getSources()
	getProblemList()
})
</script>

<template>
	<div id="container">
		<a-row :gutter="16">
			<a-col :span="4">
				<a-input v-model="query.id" placeholder="输入题目编号" @press-enter="search" @clear="search" :allow-clear="true">
					<template #prepend> 题目ID</template>
				</a-input>
			</a-col>
			<a-col :span="5">
				<a-input v-model="query.problemName" placeholder="输入题目名称" @press-enter="search" @clear="search" :allow-clear="true">
					<template #prepend> 题目名称</template>
				</a-input>
			</a-col>
			<a-col :span="4">
				<a-select placeholder="请选择" v-model="query.difficulty" :trigger-props="{ autoFitPopupMinWidth: true }" :allow-clear="true" @change="search">
					<template #prefix>难度</template>
					<a-option value="eazy">简单</a-option>
					<a-option value="medium">中等</a-option>
					<a-option value="hard">困难</a-option>
				</a-select>
			</a-col>
			<a-col :span="4">
				<a-select placeholder="请选择" v-model="query.categoryId" :trigger-props="{ autoFitPopupMinWidth: true }" :allow-clear="true" @change="search">
					<template #prefix>分类</template>
					<a-option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</a-option>
				</a-select>
			</a-col>
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
					<a-button type="primary" status="success" @click="() => router.push('/admin/add-question')">
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
			:data="problemList"
			:columns="columns"
			:loading="loading"
			:scroll="scroll"
			:pagination="pagination"
			@page-change="pageChange"
			@page-size-change="pageSizeChange"
			page-position="bl"
		>
			<template #category_id="{ record }">
				{{ categoryList.find((item) => item.id === record.category_id)?.name }}
			</template>
			<template #difficulty="{ record }">
				<a-tag v-if="record.difficulty === 'eazy'" color="#7bc616">简单</a-tag>
				<a-tag v-else-if="record.difficulty === 'medium'" color="#ff7d00">中等</a-tag>
				<a-tag v-else color="#f53f3f">困难</a-tag>
			</template>
			<template #source_id="{ record }">
				{{ sourceList.find((item) => item.id === record.source_id)?.name }}
			</template>
			<template #action="{ record }">
				<a-space>
					<a-button type="primary" size="small" @click="editor(record)">编辑</a-button>
					<a-button type="primary" status="success" size="small" @click="updateProblemStatus(record, 1)" v-if="record.isUse === '0'">发布 </a-button>
					<a-button type="primary" status="danger" size="small" @click="updateProblemStatus(record, 0)" v-else>取消发布 </a-button>
					<a-button size="small" status="danger" @click="deleteQuestion(record)">删除</a-button>
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
