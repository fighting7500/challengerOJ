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
        name: '首页',
        component: () => import('@/views/home/index.vue'),
        meta: {
            hidden: true
        }
    },

    {
        path: '/learn',
        name: '探索',
        component: () => import('@/views/learn/index.vue')
    },
    {
        path: '/question',
        name: '题库',
        component: () => import('@/views/question/index.vue')
    },
    {
        path: '/challenge',
        name: '挑战',
        component: () => import('@/views/challenge/index.vue')
    },
    {
        path: '/community',
        name: '社区',
        component: () => import('@/views/community/index.vue')
    },
    {
        path: '/learn/detail/:id',
        name: '详情',
        component: () => import('@/views/detail/index.vue'),
        meta: {
            hidden: true
        }
    },
    {
        path: '/user',
        name: 'user',
        meta: {
            hidden: true
        },
        children: [
            {
                path: '',
                name: 'UserInfo',
                component: () => import('@/views/user/UserInfo.vue')
            },
            {
                path: 'login',
                name: 'login',
                component: () => import('@/views/user/LoginForm.vue')
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/views/user/register.vue')
            }
        ]
    },
    // 404
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/error/404.vue'),
        meta: {
            hidden: true
        }
    }
]
