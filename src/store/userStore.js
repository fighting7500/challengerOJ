import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('useUser', () => {
    const token = ref('')
    const setToken = (newToken) => {
        token.value = newToken
    }
    const userInfo = ref({})
    const setUserInfo = (newUserInfo) => {
        userInfo.value = newUserInfo
    }
    const roles = ref([])
    const setRoles = (newRoles) => {
        roles.value = newRoles
    }
    return {
        token,
        setToken,
        userInfo,
        setUserInfo,
        roles,
        setRoles
    }
})