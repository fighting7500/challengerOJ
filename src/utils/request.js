// request.js
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const service = axios.create({
	baseURL: 'http://127.0.0.1:7500', // api 的 base_url
	timeout: 5000, // 请求超时时间
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
})

// request拦截器
service.interceptors.request.use(
	config => {
		// if (store.getters.token) {
		// 	config.headers['X-Token'] = getToken()
		// }
		return config
	},
	error => {
		// Do something with request error
		console.log(error) // for debug
		Promise.reject(error)
	}
)

// response 拦截器
service.interceptors.response.use(
	response => {
		const res = response.data
		return res
	},
	error => {
		ElMessage.error('网络错误'+ error.message)
		return Promise.reject(error)
	}
)

export default service