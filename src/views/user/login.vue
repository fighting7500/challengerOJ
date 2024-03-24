<script setup>
import '@/styles/login.scss'
import Footer from '@/components/GloabalFooter.vue'
</script>

<template>
    <div class="container">
        <el-row>
            <el-col :span="24">
                <div class="head">
                    <div class="logo">
                        <router-link to="/">
                            <img src="@/assets/logo.png" alt="MySQL自学网站" title="MySQL自学网站" />
                        </router-link>
                    </div>
                </div>
                <el-divider class="divider" />
            </el-col>
        </el-row>
        <router-view></router-view>
        <el-row>
            <el-col :span="24">
                <Footer></Footer>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
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
