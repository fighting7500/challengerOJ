<script setup>
import { format } from 'sql-formatter'
import { ref, computed, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useLevelStore, useResultStore } from '@/store'
const levelStore = useLevelStore()
const resultStore = useResultStore()
const { level } = storeToRefs(levelStore)
const { resultStatus } = storeToRefs(resultStore)

// 活动选项卡
const activeKey = ref('1')
watch([resultStatus], () => {
  activeKey.value = '1'
})

// 接收params参数
const props = defineProps({
  levelKey: String
})

const levelKey = computed(() => {
  console.log('props改变了')
  levelStore.setLevelKey(props.levelKey)
  if (props.levelKey) {
    return props.levelKey
  }
  return 'level1'
})

// 切换关卡时，重置状态
watch([levelKey], () => {
  resultStore.setResultStatus(-1)
  answer.value.innerHTML = format(level.value.answer)
  resultStore.setResult(null)
  if (activeKey.value !== '1') {
    activeKey.value = '1'
  }
})

// 格式化答案
const answer = ref(null)
onMounted(() => {
  answer.value.innerHTML = format(level.value.answer)
})
</script>

<template>
  <div>
    <a-row>
      <a-col :lg="10" :xs="24">
        <m-d />
      </a-col>
      <a-col :lg="14" :xs="24" class="right">
        <!-- sql语句编辑器 -->
        <code-editor isShow />
        <!-- 关卡btn -->

        <!-- 选项卡 -->
        <a-collapse v-model:activeKey="activeKey" accordion class="topic">
          <!-- 查看执行结果 -->
          <a-collapse-panel
            key="1"
            header="查看执行结果"
            class="result-collapse-panel"
          >
            <sql-result />
          </a-collapse-panel>
          <!-- 查看提示 -->
          <a-collapse-panel key="2" header="查看提示">
            <p>{{ level.hint }}</p>
          </a-collapse-panel>
          <!-- 查看建表语句 -->
          <a-collapse-panel key="3" header="查看建表语句">
            <code-editor readOnly isBuildTable />
          </a-collapse-panel>
          <!-- 查看答案 -->
          <a-collapse-panel forceRender key="4" header="查看答案">
            <pre ref="answer"></pre>
          </a-collapse-panel>
        </a-collapse>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.right {
  padding: 0 50px;
}

.topic {
  margin-top: 30px;
}
.result-collapse-panel .ant-collapse-content-box {
  padding: 0 !important;
}
.btn-right {
  text-align: right;
  margin-top: 20px;
}
</style>
