<script setup>
import { watchEffect } from 'vue'
import { useLevelStore, useResultStore } from '@/store'
import { storeToRefs } from 'pinia'
const levelStore = useLevelStore()
const resultStore = useResultStore()
levelStore.setLevelKey('level1')

const sqlHistoryList = localStorage.getItem('MYSQL_SQLHISTORY_List')
  ? JSON.parse(localStorage.getItem('MYSQL_SQLHISTORY_List'))
  : storeToRefs(resultStore).sqlHistoryList
watchEffect(() => {
  if (!resultStore.sql) return
  // 将sql和result存储到resultStore的sqlHistoryList中
  resultStore.setSqlHistoryList({
    sql: resultStore.sql,
    result: resultStore.result
  })
  // 将SqlHistoryList存储到localStorage中
  localStorage.setItem(
    'MYSQL_SQLHISTORY_List',
    JSON.stringify(resultStore.sqlHistoryList)
  )
})
</script>
<template>
  <div class="playground">
    <h2>请输入任意 SQL 语句，尽情探索吧</h2>
    <a-row :gutter="[16, 16]">
      <a-col :lg="10" :xs="24">
        <code-editor isShow />
        <a-card title="执行历史" style="margin-top: 20px">
          <a-collapse v-if="sqlHistoryList.length > 0" accordion>
            <a-collapse-panel
              v-for="(data, index) in sqlHistoryList"
              :key="index"
              :header="data.sql"
            >
              <sql-result :table-result="data.result" />
            </a-collapse-panel>
          </a-collapse>
          <a-collapse
            v-else
            style="height: 46px; line-height: 46px; padding-left: 10px"
            >暂无执行历史</a-collapse
          >
        </a-card>
      </a-col>
      <a-col :lg="14" :xs="24" style="padding: 0 70px">
        <sql-result />
      </a-col>
    </a-row>
  </div>
</template>
<style scoped>
.playground {
  padding: 0 24px;
}
</style>
