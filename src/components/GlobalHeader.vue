<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getToken } from '@/utils/auth.js'
import User from './user.vue'
import { routes } from '@/router/routes.js'
import { apiGetUserInfo } from '@/api/user.js'
import { Message } from '@arco-design/web-vue'
import { useUserStore } from '@/store/userStore.js'

const router = useRouter()
const activeIndex = ref(['/'])

router.afterEach((to) => {
    activeIndex.value = [to.path]
})
// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
    return routes.filter((item) => {
        if (item.meta?.hidden) {
            return false
        }
        // 根据权限过滤菜单, 如果是管理员界面，只有管理员才能看到
        if (item.path === '/admin') {
            return useUserStore().userInfo.role === '0'
        }
        return true
    })
})
const handleSelect = (key) => {
    // 如果是管理员界面，新建一个窗口
    if (key === '/admin') {
        window.open('/admin')
        return
    }
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
let userInfo = reactive({})
// 页面创建的时候判断是否有token
if (getToken()) {
    isLogin.value = true
    // 获取用户信息
    apiGetUserInfo().then((res) => {
        if (res.status !== 200) {
            Message.error(res.msg)
            isLogin.value = false
            return
        }
        userInfo = res.data
        // 存储用户信息
        useUserStore().setUserInfo(res.data)
    })
}
</script>

<template>
    <a-row :wrap="false" justify="center" align="center" style="width: 1400px; margin: 0 auto">
        <a-col :flex="3">
            <div class="logo">
                <img src="../assets/logo.png" alt="编程挑战者" title="编程挑战者" @click="() => router.push('/')" />
            </div>
        </a-col>
        <a-col :flex="12">
            <a-menu mode="horizontal" :selected-keys="activeIndex" @menu-item-click="handleSelect">
                <a-menu-item v-for="item in visibleRoutes" :key="item.path">{{ item.name }}</a-menu-item>
            </a-menu>
        </a-col>
        <a-col :flex="4" style="text-align: right; margin-right: 20px">
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
        <a-col :flex="1">
            <div v-if="isLogin" class="user">
                <User :userInfo="userInfo" />
            </div>
            <div class="btn" v-else>
                <a-button type="text" shape="round" @click="() => router.push('/user/login')">登录</a-button>
                <span>或</span>
                <a-button type="primary" shape="round" @click="() => router.push('/user/register')"> 注册</a-button>
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
        margin: 0 15px 0 10px;
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
.btn {
    display: flex;
    align-items: center;
}
</style>
