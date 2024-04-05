<!--
 * @Author: 17197
 * @Date: 2024/4/4
 * @Description: Admin.vue
 * @Version: 1.0
 * @Last Modified time : 2024/4/4
-->
<script setup>
import { computed } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
const activeIndex = computed(() => [router.currentRoute.value.path])
const menuClick = (key) => {
    router.push(key)
}
</script>

<template>
    <a-layout style="height: 100%">
        <a-layout-sider>
            <a-menu :selected-keys="activeIndex" @menu-item-click="menuClick">
                <a-menu-item key="/admin">
                    <template #icon><icon-home /></template>
                    首页
                </a-menu-item>
                <a-menu-item key="/admin/user-list">
                    <template #icon><icon-font type="icon-yonghuguanli" :size="16" /></template>
                    用户列表
                </a-menu-item>
                <a-sub-menu key="sub1">
                    <template #icon><icon-font type="icon-timu1" :size="16" /></template>
                    <template #title> 题目管理</template>
                    <a-menu-item key="/admin/question-list">题目列表</a-menu-item>
                    <a-menu-item key="/admin/add-question">新增题目</a-menu-item>
                </a-sub-menu>
                <a-menu-item key="/admin/answer">
                    <template #icon><icon-font type="icon-daanjiexi" :size="16" /></template>
                    题解管理
                </a-menu-item>
                <a-menu-item key="/admin/article">
                    <template #icon><icon-font type="icon-navicon-wzgl" :size="16" /></template>
                    文章管理
                </a-menu-item>
                <a-menu-item key="/admin/category">
                    <template #icon><icon-font type="icon-sort" :size="16" /></template>
                    分类管理
                </a-menu-item>
                <a-menu-item key="/admin/points">
                    <template #icon><icon-font type="icon-jifen" :size="16" /></template>
                    积分管理
                </a-menu-item>
                <a-menu-item key="/admin/setting">
                    <template #icon><icon-font type="icon-xitongshezhi" :size="16" /></template>
                    系统设置
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout-content class="layout-content">
            <router-view />
        </a-layout-content>
    </a-layout>
</template>

<style scoped lang="scss">
.layout-content {
    margin: 20px;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
}
</style>
