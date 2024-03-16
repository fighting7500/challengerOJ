import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '',
			name: 'home',
			component: () => import('@/views/home/index.vue'),
		},
		{
			path: '/',
			name: 'index',
			component: () => import('@/views/index.vue'),
			children: [
				{
					path: 'learn',
					name: 'learn',
					component: () => import('@/views/learn/index.vue'),
				},
				{
					path: 'question',
					name: 'question',
					component: () => import('@/views/question/index.vue'),
				},
				{
					path: 'challenge',
					name: 'challenge',
					component: () => import('@/views/challenge/index.vue'),
				},
				{
					path: 'community',
					name: 'community',
					component: () => import('@/views/community/index.vue'),
				}
			]
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/user/login.vue'),
			children: [
				{
					path: '',
					name: 'login',
					component: () => import('@/views/user/components/LoginForm.vue'),
				},
				{
					path: 'register',
					name: 'register',
					component: () => import('@/views/user/components/register.vue'),
				},
			]
		},
		// 404
		{
			path: '/:pathMatch(.*)*',
			name: 'not-found',
			component: () => import('@/views/error/404.vue'),
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
