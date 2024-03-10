import request from '@/utils/request'
// 滑块验证
export function apiVerifyCaptcha(captchaVerifyParam) {
	return request({
		url: '/user/verifyCaptcha',
		method: 'post',
		data: {
			captchaVerifyParam: captchaVerifyParam
		}
	})
}

// 发送验证码
export function apiverifyCode(mobile) {
	return request({
		url: '/user/verifyCode',
		method: 'post',
		data: {
			usermobile: mobile
		}
	})
}

// 登录
export function apiLogin(params) {
	return request({
		url: '/user/login',
		method: 'post',
		data: {
			isCode: params.isCode,
			usermobile: params.usermobile,
			password: params.password,
			code: params.code,
			remember: params.remember,
			account: params.account
		}
	})
}

// 查询用户名，手机号，邮箱是否存在
export function apiCheckUser(params) {
	return request({
		url: '/user/checkUser',
		method: 'post',
		data: {
			type: params.type,
			value: params.value
		}
	})
}


// 注册
export function apiRegister(params) {
	return request({
		url: '/user/register',
		method: 'post',
		data: {
			usermobile: params.userMobile,
			password: params.password,
			code: params.code,
			username: params.userName,
			email: params.email
		}
	})
}