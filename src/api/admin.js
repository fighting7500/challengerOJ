/**
 * @Author: 17197
 * @Date: 2024/4/4
 * @Description: admin.js
 * @Version: 1.0
 * @Last Modified time : 2024/4/4
 **/
import request from '@/utils/request'

// 查询用户列表
export function apiGetUserList(params) {
	return request({
		url: '/admin/GetUserList',
		method: 'get',
		params: {
			page: params.page,
			limit: params.pageSize,
			id: params.userID,
			phone: params.mobile,
			role: params.role
		}
	})
}

// 新增用户
export function apiAddUser(data) {
	return request({
		url: '/admin/AddUser',
		method: 'post',
		data: {
			username: data.userName,
			password: data.password,
			role: data.role,
			mobile: data.userMobile,
			email: data.email || ''
		}
	})
}

// 删除用户
export function apiDeleteUser(data) {
	return request({
		url: '/admin/DeleteUser',
		method: 'delete',
		params: {
			id: data.id
		}
	})
}

// 修改用户
export function apiUpdateUser(data) {
	return request({
		url: '/admin/UpdateUser',
		method: 'put',
		data: {
			id: data.id,
			username: data.userName,
			password: data.password,
			role: data.role,
			phone: data.userMobile,
			email: data.email || ''
		}
	})
}

// 发布/取消发布题目
export function apiUpdateProblemStatus(params) {
	return request({
		url: '/admin/UpdateProblemStatus',
		method: 'put',
		params: {
			id: params.id,
			status: params.isUse
		}
	})
}

// 删除题目
export function apiDeleteProblem(params) {
	return request({
		url: '/admin/DeleteProblem',
		method: 'delete',
		params: {
			id: params.id
		}
	})
}

// 新增题目
export function apiAddProblem(form, data) {
	return request({
		url: '/admin/AddProblem',
		method: 'post',
		data: {
			Form: form,
			SampleInputs: data.sampleInputs,
			SampleOutputs: data.sampleOutputs,
			SampleRemarks: data.sampleRemarks,
			TestInputs: data.testInputs,
			TestExpectedOutputs: data.testExpectedOutputs
		}
	})
}

// 审核文章
export function apiUpdateArticleStatus(params) {
	return request({
		url: '/admin/UpdateArticleStatus',
		method: 'put',
		params: {
			id: params.id,
			status: params.status
		}
	})
}
