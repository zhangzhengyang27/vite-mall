import { useCookies } from '@vueuse/integrations/useCookies'

const TokenKey = 'token'
const cookie = useCookies()

// 从 cookie 中获取 token
export function getToken() {
    return cookie.get(TokenKey)
}

// 将 token 保存到 cookie 中
export function setToken(token) {
    return cookie.set(TokenKey, token)
}

// 从 cookie 中移除 token
export function removeToken() {
    return cookie.remove(TokenKey)
}
