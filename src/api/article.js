/**
 * @Author: 17197
 * @Date: 2024-05-02 00:48:59
 * @Description: article.js
 * @Version: 1.0
 * @Last Modified time : 2024-05-02 00:48:59
 **/
import request from '@/utils/request'

// 获取文章列表
export function apiGetArticleList(params) {
	return request({
		url: '/article/GetArticleList',
		method: 'get',
		params: {
			Page: params.pageNum,
			Limit: params.pageSize,
			Title: params.articleName || '',
			Admin: params.admin || ''
		}
	})
}

// 获取文章详情
export function apiGetArticleDetail(id) {
	return request({
		url: '/article/GetArticleDetail',
		method: 'get',
		params: {
			Id: id
		}
	})
}

// 发布文章
export function apiPublishArticle(data) {
	return request({
		url: '/article/PublishArticle',
		method: 'post',
		data
	})
}

// 删除文章
export function apiDeleteArticle(params) {
	return request({
		url: '/article/DeleteArticle',
		method: 'delete',
		params: {
			Id: params.id,
			UserID: params.userID
		}
	})
}

// 获取必读榜单（点赞量前十）
export function apiGetReadList() {
	return request({
		url: '/article/GetReadList',
		method: 'get'
	})
}
