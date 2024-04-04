/**
 * @Author: 17197
 * @Date: 2024/4/4
 * @Description: composables.js
 * @Version: 1.0
 * @Last Modified time : 2024/4/4
 **/
// 时间格式化,2024-03-29T03:40:10.000Z => 2024-03-29 11:40:10
export function useTimeFormat(time) {
    const date = new Date(time)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = date.getDate() + ' '
    const h = date.getHours() + ':'
    const m = date.getMinutes() + ':'
    const s = date.getSeconds()
    return Y + M + D + h + m + s
}
