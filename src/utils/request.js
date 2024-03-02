// request.js
import axios from 'axios'

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
// service.interceptors.response.use(
// 	response => {
// 		const res = response.data
// 		if (res.code !== 20000) {
// 			// 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
// 			if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
// 				// 请自行在引入 MessageBox
// 				// import { Message, MessageBox } from 'element-ui'
// 				MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
// 					confirmButtonText: 'Re-Login',
// 					cancelButtonText: 'Cancel',
// 					type: 'warning'
// 				}).then(() => {
// 					store.dispatch('user/resetToken').then(() => {
// 						location.reload()
// 					})
// 				})
// 			}
// 			return Promise.reject(new Error(res.message || 'Error'))
// 		} else {
// 			return res
// 		}
// 	},
// 	error => {
// 		console.log('err' + error) // for debug
// 		return Promise.reject(error)
// 	}
// )

export default service