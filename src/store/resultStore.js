import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useResultStore = defineStore('useResult', () => {
  const resultStatus = ref(-1)
  const setResultStatus = (resultSta) => {
    resultStatus.value = resultSta
  }
  const result = ref(null)
  const setResult = (dbResult) => {
    result.value = dbResult
  }
  const resultMsg = ref('')
  const setMsg = (msg) => {
    resultMsg.value = msg
  }
  const sql = ref('')
  const setSql = (inputSql) => {
    // 判断inputSql字符串是否包含'-- 请在此处输入 SQL\n'，如果包含则去掉
    if (inputSql.includes('-- 请在此处输入 SQL\n')) {
      inputSql = inputSql.replace('-- 请在此处输入 SQL\n', '')
    }
    sql.value = inputSql
  }
  const sqlHistoryList = ref([])
  const setSqlHistoryList = (sqlList) => {
    sqlHistoryList.value.push(sqlList)
  }
  return {
    resultStatus,
    setResultStatus,
    result,
    setResult,
    resultMsg,
    setMsg,
    sql,
    setSql,
    sqlHistoryList,
    setSqlHistoryList
  }
})
