import request from '@/utils/request'
import { getToken } from '@/utils/auth.js'
// 滑块验证
export function apiVerifyCaptcha(captchaVerifyParam) {
    return request({
        url: '/user/verifyCaptcha',
        method: 'post',
        data: {
            CaptchaVerifyParam: captchaVerifyParam
        }
    })
}

// 发送验证码
export function apiVerifyCode(mobile) {
    return request({
        url: '/user/verifyCode',
        method: 'post',
        data: {
            UserMobile: mobile
        }
    })
}

// 登录
export function apiLogin(params) {
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            IsCode: params.isCode,
            UserMobile: params.usermobile,
            Password: params.password,
            Code: params.code,
            Account: params.account
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
            UserMobile: params.userMobile,
            Password: params.password,
            Code: params.code,
            UserName: params.userName,
            Email: params.email
        }
    })
}

// 获取用户信息
export function apiGetUserInfo() {
    return request({
        url: '/user/getUserInfo',
        method: 'get'
    })
}

// 刷新token
export function apiRefreshToken() {
    return request({
        url: '/user/refreshToken',
        method: 'post',
        data: {
            refreshToken: getToken('refreshToken')
        }
    })
}

// 退出登录
export function apiLogout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}

// 重置密码
export function apiResetPassword(params) {
    return request({
        url: '/user/resetPassword',
        method: 'post',
        data: {
            UserMobile: params.userMobile,
            Password: params.password,
            Code: params.code
        }
    })
}
