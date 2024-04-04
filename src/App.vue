<!--
 * @Author: 17197
 * @Date: 2024/3/24
 * @Description: GlobalHeader.vue
 * @Version: 1.0
 * @Last Modified time : 2024/3/24
-->
<template>
    <div id="app">
        <template v-if="route.path.startsWith('/user') || route.path.startsWith('/admin')">
            <user-layout />
        </template>
        <template v-else-if="route.path.startsWith('/challenge')">
            <router-view />
        </template>
        <template v-else>
            <basic-layout />
        </template>
    </div>
</template>

<style scoped></style>
<script setup>
import BasicLayout from '@/layout/BasicLayout.vue'
import { useRoute, RouterView } from 'vue-router'
import UserLayout from '@/layout/UserLayout.vue'

const route = useRoute()
</script>
