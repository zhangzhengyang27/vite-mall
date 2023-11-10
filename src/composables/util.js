import { ElMessageBox, ElNotification } from 'element-plus'
import nprogress from 'nprogress'

export function toast(
  message,
  type = 'success',
  dangerouslyUseHTMLString = true
) {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000
  })
}

export function showFullLoading() {
  nprogress.start()
}

export function hideFullLoading() {
  nprogress.done()
}

export function showModal(content = '提示内容', type = 'warning', title = '') {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type
  })
}

export function showPrompt(tip, value = '') {
  return ElMessageBox.prompt(tip, '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: value
  })
}

// 将 query 对象转换成 URL 参数
export function queryParams(query) {
  let q = []
  for (let k in query) {
    if (query[k]) {
      q.push(`${k}=${query[k]}`)
    }
  }
  let r = q.join('&')
  return r ? `?${r}` : ''
}
