/**
 * @Author: 17197
 * @Date: 2024/4/4
 * @Description: composables.js
 * @Version: 1.0
 * @Last Modified time : 2024/4/4
 **/
// 时间格式化,2024-03-29T03:40:10.000Z => YY-MM-DD hh:mm:ss, 补齐0
export function useTimeFormat(time) {
	if (!time) return ''
	const date = new Date(time)
	const year = date.getFullYear()
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const day = date.getDate().toString().padStart(2, '0')
	const hour = date.getHours().toString().padStart(2, '0')
	const minute = date.getMinutes().toString().padStart(2, '0')
	const second = date.getSeconds().toString().padStart(2, '0')
	return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

// 获取窗口高度，根据传参减去高度返回表格高度
export function useWindowHeight(height = 0) {
	let windowHeight = window.innerHeight
	// 顶部导航栏高度
	const headerHeight = 60
	// 表格头部高度
	const tableHeaderHeight = 40
	// 分页器高度
	const paginationHeight = 40
	// 间距
	const spacing = 20
	// 监听窗口变化
	window.onresize = () => {
		windowHeight = window.innerHeight
	}
	return windowHeight - headerHeight - tableHeaderHeight - paginationHeight - spacing - height
}
