/**
 * @Author: 17197
 * @Date: 2024/3/31
 * @Description: question.js
 * @Version: 1.0
 * @Last Modified time : 2024/3/31
 **/
import request from '@/utils/request'

// 获取题目分类
export function apiCategories(params) {
    return request({
        url: '/question/categories',
        method: 'get',
        params: {
            admin: params.admin || 0
        }
    })
}

// 获取题目列表
export function apiGetProblemList(params) {
    return request({
        url: '/question/GetProblemList',
        method: 'get',
        params: {
            Page: params.pageNum,
            Limit: params.pageSize,
            ProblemName: params.problemName,
            CategoryId: params.categoryId,
            Difficulty: params.difficulty,
            SourceId: params.sourceId || '',
            ID: params.id || '',
            UserID: params.userID || '',
            Status: params.status || ''
        }
    })
}

// 通过id获取题目详情
export function apiGetProblemById(params) {
    return request({
        url: '/question/GetProblemById',
        method: 'get',
        params: {
            id: params.id
        }
    })
}

// 获取来源列表
export function apiGetSources() {
    return request({
        url: '/question/GetSources',
        method: 'get'
    })
}

// 获取统计数据
export function apiGetStatistics(params) {
    return request({
        url: '/question/GetStatistics',
        method: 'get',
        params: {
            UserID: params.userId
        }
    })
}

// 获取排行榜
export function apiGetRankList() {
    return request({
        url: '/question/GetRankList',
        method: 'get'
    })
}

// 获取题目详情
export function apiGetProblemDetail(id) {
    return request({
        url: '/question/GetProblemDetail',
        method: 'get',
        params: {
            ID: id
        }
    })
}
