import { ElMessageBox, ElNotification } from 'element-plus'
import nprogress from 'nprogress'

export function toast(message, type = 'success', dangerouslyUseHTMLString = true) {
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

//使用 splice 方法从数组 arr 中移除位于 index2 的元素，并将位于 index1 的元素插入到 index2 的位置
// splice 方法会返回一个包含被移除元素的新数组，我们通过 [0] 获取这个被移除的元素
function swapArray(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
    return arr
}

// 上移
export function useArrayMoveUp(arr, index) {
    swapArray(arr, index, index - 1)
}

// 下移
export function useArrayMoveDown(arr, index) {
    swapArray(arr, index, index + 1)
}

// sku 排列算法
/**
 * cartesianProductOf 函数用于计算传入的多个数组的笛卡尔积。笛卡尔积是所有可能的组合，每个组合中包含来自每个数组的一个元素。
 * 函数使用 Array.prototype.reduce.call 方法来遍历传入的所有数组（通过 arguments 对象获取）。reduce 方法接收一个回调函数和一个初始值（这里是一个包含空数组的数组）。
 * 在回调函数中，我们定义了一个空数组 ret，然后遍历当前的累积值 a 和下一个数组 b。对于 a 中的每个元素，我们都遍历 b，并将 a 和 b 的元素组合起来（通过 a.concat([b])），
 * 然后将结果添加到 ret 中。
 * 最后，回调函数返回 ret，这个 ret 就会成为下一次调用回调函数时的累积值 a。当所有的数组都遍历完后，reduce 方法返回的就是所有数组的笛卡尔积。
 * 这个函数可以在需要计算多个数组的所有可能组合的场景中使用，例如在处理复杂的数据结构或算法问题时
 */
export function cartesianProductOf() {
    return Array.prototype.reduce.call(
        arguments,
        function (a, b) {
            const ret = []
            a.forEach(function (a) {
                b.forEach(function (b) {
                    ret.push(a.concat([b]))
                })
            })
            return ret
        },
        [[]]
    )
}
