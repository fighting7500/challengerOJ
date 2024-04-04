<!--
 * @Author: 17197
 * @Date: 2024/3/29
 * @Description: UserProfile.vue
 * @Version: 1.0
 * @Last Modified time : 2024/3/29
-->
<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/userStore.js'
import RouterView from '@/App.vue'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
</script>

<template>
    <a-layout id="user-info">
        <a-layout>
            <a-layout-sider class="slider">
                <div class="slider-head">
                    <a-avatar :size="55" shape="square">
                        <img alt="avatar" :src="userInfo.avatar" />
                    </a-avatar>
                    <div>
                        <span>{{ userInfo.username }}</span>
                    </div>
                </div>
                <a-divider style="margin: 0" />
                <a-menu :default-selected-keys="['/']">
                    <a-menu-item key="1">
                        <template #icon><icon-star /></template>
                        收藏夹
                    </a-menu-item>
                    <a-menu-item key="2">
                        <template #icon><icon-bar-chart /></template>
                        做题分析
                    </a-menu-item>
                    <a-menu-item key="3">
                        <template #icon><icon-fire /></template>
                        积分
                    </a-menu-item>
                    <a-menu-item key="/profile">
                        <template #icon><icon-idcard /></template>
                        个人资料
                    </a-menu-item>
                </a-menu>
            </a-layout-sider>
            <a-layout-content></a-layout-content>
        </a-layout>
    </a-layout>
</template>

<style scoped lang="scss">
#user-info {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}
.arco-layout-sider-light {
    background-color: initial;
    box-shadow: initial;
}
.slider {
    padding: 0 5px;
}
.slider-head {
    padding: 20px 0 10px;
    text-align: center;
    span {
        font-size: 20px;
        line-height: 40px;
    }
}
</style>
