// auth.js
import Cookies from 'js-cookie';

let Token = 'code_challenger_token'
// 获取token
export function getToken() {
    return Cookies.get(Token)
}

// 设置token
export function setToken(token) {
    return Cookies.set(Token, token)
}

// 删除token
export function removeToken() {
    return Cookies.remove(Token)
}


