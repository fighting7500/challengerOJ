<!--
 * @Author: 17197
 * @Date: 2024/3/28
 * @Description: QuesttionAnswer.vue
 * @Version: 1.0
 * @Last Modified time : 2024/3/28
-->
<script setup></script>

<template>
    <a-input :style="{ width: '320px' }" placeholder="Please enter something" allow-clear>
        <template #prefix>
            <icon-user />
        </template>
    </a-input>
    <a-input :style="{ width: '320px' }" placeholder="Please enter something" allow-clear>
        <template #suffix>
            <icon-info-circle />
        </template>
    </a-input>
</template>

<style scoped lang="scss"></style>
