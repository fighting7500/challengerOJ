/**
 * @Author: 17197
 * @Date: 2024/3/31
 * @Description: question.js
 * @Version: 1.0
 * @Last Modified time : 2024/3/31
 **/
import request from '@/utils/request'
import { getToken } from '@/utils/auth.js'
// 获取题目分类
export function apiCategories() {
    return request({
        url: '/question/categories',
        method: 'get'
    })
}

// 获取题目列表
export function apiProblems(params) {
    return request({
        url: '/question/problems',
        method: 'get',
        params
    })
}
