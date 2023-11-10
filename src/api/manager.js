import { queryParams } from '@/composables/util'
import axios from '@/utils/axios'

export function login(username, password) {
    return axios.post('/admin/login', {
        username,
        password
    })
}

export function getInfo() {
    return axios.post('/admin/getinfo')
}

export function logout() {
    return axios.post('/admin/logout')
}

export function updatePassword(data) {
    return axios.post('/admin/updatepassword', data)
}

export function getManagerList(page, query = {}) {
    let r = queryParams(query)
    return axios.axios.get(`/admin/manager/${page}${r}`)
}

export function updateManagerStatus(id, status) {
    return axios.post(`/admin/manager/${id}/update_status`, {
        status
    })
}
