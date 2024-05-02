// request.js
import axios from 'axios'
import { Message } from '@arco-design/web-vue'
import { apiRefreshToken } from '@/api/user.js'

// 创建axios实例
const service = axios.create({
	// baseURL: 'http://192.168.237.195:7500', // api 的 base_url
	baseURL: 'http://localhost:7500', // api 的 base_url
	timeout: 5000, // 请求超时时间
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	withCredentials: true // 设置cross跨域 并设置访问权限 允许跨域携带cookie信息
})

// request拦截器
service.interceptors.request.use(
	(config) => {
		// if (getToken()) {
		//     config.headers['X-Auth-Token'] = getToken()
		// }
		return config
	},
	(error) => {
		// Do something with request error
		console.log(error) // for debug
		Promise.reject(error)
	}
)

// response 拦截器
service.interceptors.response.use(
	async (response) => {
		// 刷新token
		if (response.data.status === 401 && !response.config.retry) {
			await apiRefreshToken()
			response.config.retry = true
			return service(response.config)
		} else if (response.data.status === 405) {
			// token不存在
			// 重新登录
			Message.error('用户信息登录超时，请重新登录')
			setTimeout(() => {
				window.location.href = '/user/login'
			}, 1000)
		} else {
			return response.data
		}
	},
	(error) => {
		Message.error('请求错误', error.message)
		return Promise.reject(error)
	}
)

export default service
