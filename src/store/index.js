import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import routers from './modules/routers'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // 权限系统默认
    app,
    user,
    routers,
    settings
  },
  getters
})

export default store
