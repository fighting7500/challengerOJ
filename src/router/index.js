import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: () => import('@/views/home/index.vue'),
			children: [
				{
					path: '',
					component: () => import('@/views/home/home.vue'),
				},
				// {
				//     path: 'playground',
				//     component: () => import('@/views/home/components/playground.vue'),
				// },
				// {
				//     path: 'markdown',
				//     component: () => import('@/views/home/components/levels.vue'),
				// },
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
