<!--
 * @Author: 17197
 * @Date: 2024/3/28
 * @Description: SubmitRecord.vue
 * @Version: 1.0
 * @Last Modified time : 2024/3/28
-->
<script setup>
import { ref } from 'vue'

const columns = [
	{
		title: '所有状态',
		dataIndex: 'status',
		key: 'status'
	},
	{
		title: '所有语言',
		dataIndex: 'language',
		key: 'language'
	},
	{
		title: '执行用时',
		dataIndex: 'useTime',
		key: 'useTime'
	},
	{
		title: '消耗内存',
		dataIndex: 'storage',
		key: 'storage'
	},
	{
		title: '备注',
		dataIndex: 'remark',
		key: 'remark'
	}
]
const data = [
	{ status: '已通过', language: 'JavaScript', useTime: '16 ms', storage: '11MB', remark: '', key: '1' },
	{ status: '已通过', language: 'Java', useTime: '30 ms', storage: '15MB', remark: '', key: '2' },
	{ status: '未通过', language: 'Java', useTime: '25 ms', storage: '10MB', remark: '', key: '3' },
	{ status: '已通过', language: 'C++', useTime: '13 ms', storage: '5MB', remark: '', key: '4' },
	{ status: '已通过', language: 'C++', useTime: '13 ms', storage: '5MB', remark: '', key: '5' }
]
</script>

<template>
	<div>
		<a-table :columns="columns" :data="data" />
	</div>
</template>

<style scoped lang="scss"></style>
