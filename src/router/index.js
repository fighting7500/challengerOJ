import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/views/home/index.vue'),
            // children: [
            //     {
            //         path: 'play',
            //         component: () => import('@/views/home/components/play.vue'),
            //     },
            //     {
            //         path: 'playground',
            //         component: () => import('@/views/home/components/playground.vue'),
            //     },
            //     {
            //         path: 'markdown',
            //         component: () => import('@/views/home/components/levels.vue'),
            //     },
            // ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/user/login.vue'),
        }
    ],
    scrollBehavior() {
        return {
            top: 0,
            behavior: 'smooth'
        }
    }
})

export default router
