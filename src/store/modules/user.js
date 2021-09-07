import { login, logout, loginUserInfo, loginStatus } from '@/api/login'
import { creatLoginWindow } from '@/utils/loginUtil'
import router, { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    isLoggedIn: false, // 判断当前登陆状态
    name: '', // 姓名
    userName: '', // 用户名
    avatar: '', // 头像
    roleList: [], // 角色列表
    permissionList: [], // 权限列表
    pagePermission: [] // 当前页面的子权限
  }
}

const state = getDefaultState()

const mutations = {
  SET_LOGGED_IN: (state, flag) => {
    state.isLoggedIn = flag
  },
  SET_LOGOUT: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_PERMISSION_LIST: (state, data) => {
    state.permissionList = data || []
  },
  SET_ROLE_LIST: (state, roleList) => {
    state.roleList = roleList || []
  },
  SET_USER_INFO(state, userInfo) {
    state.userName = userInfo.userName
    state.name = userInfo.name
    state.avatar = userInfo.avatar
  },
  SET_PAGE_PERMISSION(state, route) {
    const pagePermission = {}
    if (route && route.meta && route.meta.id) {
      const pid = route.meta.id
      const permissionList = state.permissionList.filter(item => {
        return item.pid === pid
      })
      permissionList.forEach(item => {
        pagePermission[item.code] = item
      })
    }
    state.pagePermission = pagePermission
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login(username.trim(), password).then(() => {
        commit('SET_LOGGED_IN', true)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  loginUser({ commit }) {
    return new Promise((resolve, reject) => {
      loginUserInfo().then(({ data } = {}) => {
        commit('SET_USER_INFO', { ...data, avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' })
        commit('SET_ROLE_LIST', data.roleIdList)
        commit('SET_LOGGED_IN', true)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  loginStatus({ commit }) {
    return new Promise((resolve, reject) => {
      loginStatus().then(({ data } = {}) => {
        commit('SET_PERMISSION_LIST', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户主动退出登录
  logOut({ commit, rootState }) {
    if (rootState.app.useSSO) {
      commit('SET_LOGOUT')
      location.href = rootState.app.logoutUrl
    } else {
      logout().then(() => {
        resetRouter() // TODO:
        router.push('/login')
        commit('SET_LOGOUT')
        setTimeout(() => {
          location.reload()
        }, 100)
      }).catch(e => {
        console.log(e)
      })
    }
  },

  // API返回当前状态为"未登录"，前端做退出登录处理
  logOutByFetch({ commit, rootState }, { authUrl, needNewWindow }) {
    console.log('LogOutByFetch', authUrl, needNewWindow)
    console.log('authUrl', authUrl)
    console.log('rootState', rootState.app.useSSO)
    if (rootState.app.useSSO) {
      if (needNewWindow) {
        creatLoginWindow(authUrl)
      } else {
        window.location.href = authUrl
      }
    } else {
      if (needNewWindow) {
        creatLoginWindow()
      } else {
        router.push('/login')
        setTimeout(() => {
          location.reload()
        }, 100)
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

