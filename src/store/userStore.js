import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('useUser', () => {
    const userInfo = ref({})
    const setUserInfo = (newUserInfo) => {
        userInfo.value = newUserInfo
    }
    const isLogin = ref(false)
    const setIsLogin = (newIsLogin) => {
        isLogin.value = newIsLogin
    }
    const roles = ref([])
    const setRoles = (newRoles) => {
        roles.value = newRoles
    }
    return {
        userInfo,
        setUserInfo,
        isLogin,
        setIsLogin,
        roles,
        setRoles
    }
})
