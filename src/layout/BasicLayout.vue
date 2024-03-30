<script setup>
import GlobalFooter from '@/components/GloabalFooter.vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
</script>

<template>
    <a-layout id="layout">
        <a-layout-header class="header">
            <global-header />
        </a-layout-header>
        <a-divider style="margin: 0" />
        <a-layout-content class="content">
            <router-view />
        </a-layout-content>
        <a-layout-footer class="footer">
            <global-footer />
        </a-layout-footer>
    </a-layout>
</template>

<style lang="scss" scoped>
#layout {
    min-height: 100vh;
    background-color: #fff;
}

.footer {
    text-align: center;
}
</style>
