import { constantRoutes } from '@/router'
import { getHelperList } from '@/api/helper'
import { resetRouter } from '@/router'
import handlerHelperRoutes from '@/utils/handler_helper_routes'

const state = {
  addRoutes: [],
  routes: [

  ],
  helperList: [] // 客服列表
}

const mutations = {
  'SET_HELPER_LIST'(state, data) {
    state.helperList = data
  },
  'SET_ROUTES'(state, routes) {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  'CLEAR_ROUTES'(state) {
    state.routes = []
    state.addRoutes = []
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      getHelperList().then((response) => {
        const { data } = response
        const asyncRoutes = handlerHelperRoutes(data)
        commit('SET_ROUTES', asyncRoutes)
        commit('SET_HELPER_LIST', data)
        resolve(asyncRoutes)
        console.log(response, '所有客服')
      }).catch((error) => {
        reject(error)
        console.log(error, '所有客服 失败')
      })
    })
  },
  updateRoutes({ commit }) {
    commit('CLEAR_ROUTES')
    resetRouter()
    return new Promise((resolve, reject) => {
      getHelperList().then((response) => {
        const { data } = response
        const asyncRoutes = handlerHelperRoutes(data)
        commit('SET_ROUTES', asyncRoutes)
        commit('SET_HELPER_LIST', data)
        resolve(asyncRoutes)
        console.log(response, '所有客服')
      }).catch((error) => {
        reject(error)
        console.log(error, '所有客服 失败')
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
