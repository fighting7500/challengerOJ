<!--
 * @Author: 17197
 * @Date: 2024/4/5
 * @Description: EditQuestion.vue
 * @Version: 1.0
 * @Last Modified time : 2024/4/5
-->
<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { apiGetProblemById } from '@/api/question.js'

const router = useRouter()
const route = useRoute()
const title = ref('')
const id = route.params.id
const problemInfo = ref({})

apiGetProblemById({ id }).then((res) => {
    title.value = res.data.name
    problemInfo.value = res.data
})
</script>

<template>
    <a-page-header :style="{ background: 'var(--color-bg-2)' }" title="编辑题目" :subtitle="title" @back="() => router.go(-1)" />
</template>

<style scoped lang="scss"></style>
