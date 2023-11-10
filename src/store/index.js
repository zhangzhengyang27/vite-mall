import { createStore } from 'vuex'
import { getInfo, login } from '@/api/manager'
import { removeToken, setToken } from '@/composables/auth'

const store = createStore({
    state() {
        return {
            user: {}, // 用户信息
            asideWidth: '250px', // 侧边栏宽度
            menus: [], // 菜单列表
            ruleNames: [], // 权限列表
            isCollapse: false // 菜单是否折叠
        }
    },
    mutations: {
        // 设置用户信息
        SET_USERINFO(state, user) {
            state.user = user
        },
        handleAsideWidth(state) {
            state.asideWidth = state.asideWidth == '250px' ? '64px' : '250px'
        },
        handleCollapse(state) {
            state.isCollapse = !state.isCollapse
        },
        SET_MENUS(state, menus) {
            state.menus = menus
        },
        SET_RULENAMES(state, ruleNames) {
            state.ruleNames = ruleNames
        }
    },
    actions: {
        // 登录
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password)
                    .then((res) => {
                        setToken(res.token)
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        // 获取用户信息
        getInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getInfo()
                    .then((res) => {
                        commit('SET_USERINFO', res)
                        commit('SET_MENUS', res.menus)
                        commit('SET_RULENAMES', res.ruleNames)
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        // 登出
        logout({ commit }) {
            removeToken()
            commit('SET_USERINFO', {})
        }
    }
})

export default store
