<script setup>
import { watch } from 'vue'

import { useLevelStore } from '@/store'
import { storeToRefs } from 'pinia'
const levelStore = useLevelStore()
const { level } = storeToRefs(levelStore)

// 切换关卡时，回到顶部
watch(
  () => levelStore.levelKey,
  () => {
    /* window.scrollTo({
    top: 0
    //behavior: 'smooth' // 可选，添加平滑滚动效果
  }) */
    const md = document.querySelector('.question')
    if (md) {
      // md.scrollTop = 0
      // 设置平滑滚动
      md.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
)
</script>

<template>
  <div class="question">
    <v-md-preview :text="level.content"></v-md-preview>
    <a-divider />
  </div>
</template>

<style scoped>
.question {
  max-height: calc(100vh);
  /* 设置最大高度，视口高度减去100像素 */
  min-height: 200px;
  overflow: auto;
}
</style>
