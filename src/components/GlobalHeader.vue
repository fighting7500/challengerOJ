<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getToken } from '@/utils/auth.js'
import User from './user.vue'
import { routes } from '@/router/routes.js'

const router = useRouter()
const activeIndex = ref('')

router.afterEach((to) => {
    activeIndex.value = [to.path]
})

const handleSelect = (key) => {
    router.push({
        path: key
    })
}

const searchText = ref('')
const search = () => {
    console.log(searchText.value)
}

// 判断有无登录
const isLogin = ref(false)
const userInfo = ref({})
// 页面创建的时候判断是否有token
const token = getToken('token')
if (token) {
    isLogin.value = true
    localStorage.getItem('userInfo') && (userInfo.value = JSON.parse(localStorage.getItem('userInfo')))
    console.log(localStorage.getItem('userInfo'))
}
</script>

<template>
    <a-row :wrap="false" align="center" style="width: 100%">
        <a-col :flex="3">
            <div class="logo">
                <img src="../assets/logo.png" alt="编程挑战者" title="编程挑战者" @click="() => router.push('/')" />
            </div>
        </a-col>
        <a-col :flex="12">
            <a-menu mode="horizontal" :selected-keys="activeIndex" @menu-item-click="handleSelect">
                <a-menu-item v-for="item in routes" :key="item.path">{{ item.name }}</a-menu-item>
            </a-menu>
        </a-col>
        <a-col :flex="4">
            <!--<div class="search-box">
                <input type="text" class="search-txt" placeholder="搜索" v-model="searchText" />
                <i class="iconfont icon-sousuo" aria-hidden="true" @click="search"></i>
            </div>-->
            <a-input :style="{ width: '80%', borderRadius: '15px' }" placeholder="搜索" allow-clear>
                <template #suffix>
                    <i class="iconfont icon-sousuo" aria-hidden="true" @click="search"></i>
                </template>
            </a-input>
        </a-col>
        <a-col :flex="4">
            <div v-if="isLogin" class="user">
                <User :userInfo="userInfo" />
            </div>
            <div class="btn" v-else>
                <a-button text type="primary" shape="round" danger @click="() => router.push('/login')">登录</a-button>
                <span>或</span>
                <a-button type="primary" shape="round" danger @click="() => router.push('/login/register')"> 注册 </a-button>
            </div>
        </a-col>
    </a-row>
</template>

<style lang="scss" scoped>
.logo {
    width: 150px;
    cursor: pointer;

    img {
        width: 100%;
    }
}

a {
    line-height: 64px;
    margin: 0 13px;
}

i:hover {
    color: #a1a1a1;
}

.btn {
    span {
        margin: 0 10px;
    }
}

.search-box {
    margin-right: 15px;
    border-radius: 40px;
    display: flex;
    align-items: center;
}

.search-btn {
    color: #888888;
    font-size: 24px;
    width: 20px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.4s;
}

.search-txt {
    border: none;
    background: none;
    outline: none;
    padding: 0;
    color: #222;
    font-size: 16px;
    line-height: 40px;
    width: 0;
    transition: 0.4s;
}

.search-box:hover {
    background-color: #f5f5f5;
}

.search-box:hover .search-txt {
    width: 200px;
    padding: 0 12px;
}

.search-txt:focus {
    width: 200px;
    padding: 0 12px;
}

.search-txt:focus {
    width: 200px;
}

.user {
    display: flex;
    align-items: center;
}

.el-menu--horizontal.el-menu {
    border-bottom: none;
}
</style>
