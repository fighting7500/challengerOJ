<!--
 * @Author: 17197
 * @Date: 2024/3/25
 * @Description: UserLayout.vue
 * @Version: 1.0
 * @Last Modified time : 2024/3/25
-->
<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import GlobalFooter from '@/components/GloabalFooter.vue'

const route = useRoute()
</script>

<template>
    <a-layout id="layout">
        <a-layout-header class="header">
            <a-row>
                <a-col :span="24">
                    <div class="logo">
                        <router-link to="/">
                            <img src="@/assets/logo.png" alt="MySQL自学网站" title="MySQL自学网站" />
                        </router-link>
                    </div>
                    <a-divider class="divider" />
                </a-col>
            </a-row>
        </a-layout-header>
        <a-divider style="margin: 0" />
        <a-layout-content class="content">
            <router-view />
        </a-layout-content>
        <a-layout-footer class="footer" v-if="!route.path.startsWith('/admin')">
            <global-footer />
        </a-layout-footer>
    </a-layout>
</template>

<style scoped lang="scss">
#layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
    // 垂直居中

    .content {
        flex: 1;
        background-color: #efefef;
    }
}

.logo {
    margin: 0 15px;
    width: 150px;

    img {
        width: 100%;
    }
}

.divider {
    margin: 0;
}
</style>
