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
		path: '/challenge/:id',
		name: '挑战',
		component: () => import('@/views/challenge/index.vue'),
		meta: {
			hidden: true
		}
	},
	{
		path: '/community',
		name: '社区',
		component: () => import('@/views/community/discuss.vue')
	},
	{
		path: '/article/:id',
		name: '文章详情',
		component: () => import('@/views/community/article.vue'),
		meta: {
			hidden: true
		}
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
		path: '/admin',
		name: '后台管理',
		component: () => import('@/views/admin/Admin.vue'),
		meta: {
			isAdmin: true
		},
		children: [
			{
				path: '',
				name: '管理员首页',
				component: () => import('@/views/admin/AdminIndex.vue')
			},
			{
				path: 'question-list',
				name: '题目管理',
				component: () => import('@/views/admin/QuestionList.vue')
			},
			{
				path: 'edit-question/:id',
				name: '编辑题目',
				component: () => import('@/views/admin/EditQuestion.vue')
			},
			{
				path: 'add-question',
				name: '新增题目',
				component: () => import('@/views/admin/AddQuestion.vue')
			},
			{
				path: 'user-list',
				name: '用户管理',
				component: () => import('@/views/admin/UserList.vue')
			},
			{
				path: 'answer',
				name: '题解管理',
				component: () => import('@/views/admin/AnswerList.vue')
			},
			{
				path: 'article',
				name: '文章管理',
				component: () => import('@/views/admin/ArticleList.vue')
			},
			{
				path: 'category',
				name: '分类管理',
				component: () => import('@/views/admin/CategoryList.vue')
			},
			{
				path: 'points',
				name: '积分管理',
				component: () => import('@/views/admin/PointsList.vue')
			},
			{
				path: 'setting',
				name: '系统设置',
				component: () => import('@/views/admin/Setting.vue')
			}
		]
	},
	{
		path: '/user',
		name: 'user',
		meta: {
			hidden: true
		},
		children: [
			{
				path: 'login',
				name: 'login',
				component: () => import('@/views/user/LoginForm.vue')
			},
			{
				path: 'register',
				name: 'register',
				component: () => import('@/views/user/register.vue')
			},
			{
				path: 'forget',
				name: 'forget',
				component: () => import('@/views/user/ResetPassword.vue')
			}
		]
	},
	{
		path: '/profile',
		name: 'profile',
		component: () => import('@/views/user/UserProfile.vue'),
		meta: {
			hidden: true
		}
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
