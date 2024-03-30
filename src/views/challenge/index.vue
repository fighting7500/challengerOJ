<script setup>
import Header from './components/header.vue'
import Content from './components/content.vue'
</script>

<template>
    <a-layout id="layout">
        <a-layout-header class="header">
            <Header />
        </a-layout-header>
        <a-layout-content class="content">
            <Content />
        </a-layout-content>
    </a-layout>
</template>

<style lang="scss" scoped>
#layout {
    height: 100vh;
    background-color: #f2f3f5;
}
</style>
