// auth.js
import Cookies from 'js-cookie'

// 获取token
export function getToken(Token = 'access_token') {
    return Cookies.get(Token)
}

// 设置token
export function setToken(token, Key = 'access_token') {
    return Cookies.set(Key, token)
}

// 删除token
export function removeToken(Token = 'access_token') {
    return Cookies.remove(Token)
}
