/**
 * @Author: 17197
 * @Date: 2024/3/24
 * @Description: index.js
 * @Version: 1.0
 * @Last Modified time : 2024/3/24
 **/

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        return {
            top: 0,
            behavior: 'smooth'
        }
    }
})

export default router
