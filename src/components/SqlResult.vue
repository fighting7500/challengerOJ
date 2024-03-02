<script setup>
import { RESULT_STATUS_INFO_MAP } from '@/utils/result'
import { computed, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useResultStore } from '@/store'
const resultStore = useResultStore()
import { useRoute } from 'vue-router'
const route = useRoute()

const props = defineProps({
  tableResult: Array
})
const result = props.tableResult
  ? computed(() => props.tableResult)
  : storeToRefs(resultStore).result

// 结果表格列头
const columns = computed(() => {
  if (result.value !== null) {
    if (result.value[0].columns) {
      return result.value[0].columns.map((item) => {
        return {
          title: item,
          dataIndex: item
        }
      })
    }
  }
  return []
})

// 结果表格数据
const resultData = computed(() => {
  if (result.value === null) {
    return []
  }
  if (result.value[0].values === null) {
    return []
  }
  const tempColumns = result.value[0].columns
  return result.value[0].values.map((item) => {
    const rowData = {}
    item.forEach((col, index) => {
      rowData[tempColumns[index]] = col
    })
    return rowData
  })
})

// 组件销毁时，重置状态
onUnmounted(() => {
  resultStore.setResultStatus(-1)
  resultStore.setResult(null)
  resultStore.setMsg('')
  resultStore.setSql('')
})
</script>
<template>
  <a-card
    id="sqlResult"
    title="执行结果"
    :extra="
      route.path !== '/playground'
        ? RESULT_STATUS_INFO_MAP[resultStore.resultStatus]
        : null
    "
    :bordered="false"
    style="max-height: 420px; overflow-y: auto"
  >
    <a-table
      v-if="!resultStore.resultMsg"
      class="sql-result-table"
      :columns="columns"
      :dataSource="resultData"
      size="middle"
      bordered
      :pagination="{ hideOnSinglePage: true, pageSize: 20 }"
    ></a-table>
    <div v-else>❌ 语句错误：{{ resultStore.resultMsg }}</div>
  </a-card>
</template>
