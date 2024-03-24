/**
 * @Author: 17197
 * @Date: 2024/3/24
 * @Description: routes.js
 * @Version: 1.0
 * @Last Modified time : 2024/3/24
 **/
export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue')
    },

    {
        path: '/learn',
        name: 'learn',
        component: () => import('@/views/learn/index.vue')
    },
    {
        path: '/question',
        name: 'question',
        component: () => import('@/views/question/index.vue')
    },
    {
        path: '/community',
        name: 'community',
        component: () => import('@/views/community/index.vue')
    },
    {
        path: '/learn/detail/:id',
        name: 'detail',
        component: () => import('@/views/detail/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/user/login.vue'),
        children: [
            {
                path: '',
                name: 'login',
                component: () => import('@/views/user/components/LoginForm.vue')
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/views/user/components/register.vue')
            }
        ]
    },
    {
        path: '/challenge',
        name: 'challenge',
        component: () => import('@/views/challenge/index.vue')
    },
    // 404
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/error/404.vue')
    }
]
