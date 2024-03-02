<script setup>
import { onMounted, ref, watchEffect, toRaw, computed, createVNode } from 'vue'
import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { initDB, runSQL } from '@/utils/sqlExecutor'
import { format } from 'sql-formatter'
import { Modal, message } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
import { getCurrentLevelNum, getPrevLevel, getNextLevel } from '@/levels/index'
const router = useRouter()
const route = useRoute()
console.log('route', route.path)
import { useLevelStore, useResultStore } from '@/store'
const levelStore = useLevelStore()
const { level } = storeToRefs(levelStore)
const resultStore = useResultStore()
import { checkResult } from '@/utils/result'
import { storeToRefs } from 'pinia'
import { CheckCircleOutlined } from '@ant-design/icons-vue'
import { allLevels } from '@/levels/index'

self.MonacoEnvironment = {
  getWorker() {
    return new EditorWorker()
  }
}

const inputEditor = ref(null)
const editorRef = ref(null)

const props = defineProps({
  isBuildTable: {
    type: Boolean,
    default: false
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  isShow: {
    type: Boolean,
    default: false
  }
})

// SQL初始化
const db = ref()
watchEffect(async () => {
  if (inputEditor.value) {
    // 设置编辑器内容
    if (!props.isBuildTable) {
      toRaw(inputEditor.value).setValue(
        `-- 请在此处输入 SQL\n${level.value.defaultSQL}`
      )
    } else {
      toRaw(inputEditor.value).setValue(level.value.initSQL)
    }
    db.value = await initDB(level.value.initSQL)
  }
})

// SQL格式化
const doFormat = () => {
  console.log('格式化')
  if (!inputEditor.value) {
    return
  }
  const inputStr = toRaw(inputEditor.value).getValue()
  const resultStr = format(inputStr, { language: 'sqlite' })
  toRaw(inputEditor.value).setValue(resultStr)
}

// 重置SQL
const doReset = () => {
  console.log('重置')
  if (inputEditor.value) {
    toRaw(inputEditor.value).setValue(
      `-- 请在此处输入 SQL\n SELECT * FROM student`
    )
    doSubmit()
  }
}

onMounted(async () => {
  // 初始化代码编辑器
  // editorRef.value 是一个 DOM 元素，我们需要将其转换为 Monaco Editor 实例
  inputEditor.value = monaco.editor.create(editorRef.value, {
    value: props.initValue,
    language: 'sql',
    theme: 'vs-dark',
    // 是否只读
    readOnly: props.readOnly,
    // 设置当内容没有超过编辑器高度时，编辑器高度就是设置的高度
    scrollBeyondLastLine: false,
    formatOnPaste: true,
    automaticLayout: true,
    fontSize: 15,
    minimap: {
      enabled: true
    }
  })
})

// 提交结果
const doSubmit = () => {
  console.log('提交结果')
  if (!inputEditor.value) {
    return
  }
  const inputStr = toRaw(inputEditor.value).getValue()
  route.path === '/playground' ? resultStore.setSql(inputStr) : null
  try {
    console.log(db.value, inputStr);
    const result = runSQL(db.value, inputStr)
    const answerResult = runSQL(db.value, level.value.answer)
    resultStore.setResult(result)
    resultStore.setResultStatus(checkResult(result, answerResult))
    resultStore.setMsg('')
  } catch (error) {
    message.error('语句错误，' + error.message)
    resultStore.setMsg(error.message)
    resultStore.setResultStatus(0)
    console.log('出错了', error.message)
  }
  if (
    resultStore.resultStatus === 1 &&
    route.path !== '/playground' &&
    levelNum.value < allLevels.length - 1
  ) {
    Modal.confirm({
      title: '恭喜你，回答正确！',
      icon: createVNode(CheckCircleOutlined, {
        style: 'color: #2ea043; font-size: 24px'
      }),
      content: '是否进入下一关？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        toNextLevel()
      }
    })
  }
}
const levelNum = computed(() => getCurrentLevelNum(level.value.key))
// 上一关
const toPrevLevel = () => {
  console.log('上一关')
  const prevLevel = getPrevLevel(levelStore.levelKey)
  if (prevLevel) {
    router.push(`/index/${prevLevel.key}`)
  }
}
// 下一关
const toNextLevel = () => {
  console.log('下一关')
  const nextLevel = getNextLevel(levelStore.levelKey)
  if (nextLevel.key) {
    router.push(`/index/${nextLevel.key}`)
  }
}
</script>

<template>
  <div class="code-editor">
    <div ref="editorRef" style="height: 400px"></div>
    <a-space :size="16" style="margin-top: 16px" v-if="props.isShow">
      <a-button type="primary" style="width: 180px" @click="doSubmit">
        运行
      </a-button>
      <a-button @click="doFormat">格式化</a-button>
      <a-button @click="doReset">重置</a-button>
      <div class="btn-right" v-if="route.path !== '/playground'">
        <a-button
          @click="toPrevLevel"
          style="margin-right: 20px"
          v-show="levelNum > 0"
        >
          上一关
        </a-button>

        <a-button
          type="primary"
          @click="toNextLevel"
          v-show="levelNum < allLevels.length - 1"
        >
          <!-- :disabled="resultStatus !== 1" -->
          下一关
        </a-button>
      </div>
    </a-space>
  </div>
</template>

<style></style>
