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
        dataIndex: 'name',
        key: 'name',
        slots: { customRender: 'name' }
    },
    {
        title: '所有语言',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: '执行用时',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: '消耗内存',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: '备注',
        dataIndex: 'address',
        key: 'address'
    }
]
</script>

<template>
    <div>
        <a-table :columns="columns" :data="data" />
    </div>
</template>

<style scoped lang="scss"></style>
