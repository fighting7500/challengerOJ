import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('useUser', () => {
    const userInfo = ref({})
    const setUserInfo = (newUserInfo) => {
        userInfo.value = newUserInfo
    }
    const roles = ref([])
    const setRoles = (newRoles) => {
        roles.value = newRoles
    }
    return {
        userInfo,
        setUserInfo,
        roles,
        setRoles
    }
})
