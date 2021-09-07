import AxiosInterceptorsX from './AxiosInterceptorsX.js'
import { Loading, Message } from 'element-ui'
import store from '@/store'

const options = {
  delEmpty: true,
  showLoading: true,
  autoPrompt: true,
  autoLogout: true,
  axiosOptions: {
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000,
    withCredentials: true
  }
}

let loadingInstance = null
const fetch = new AxiosInterceptorsX(options)

fetch.openLoading = () => {
  loadingInstance = Loading.service({
    lock: true,
    text: '正在加载中...',
    fullscreen: true,
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'loading-top'
  })
}
fetch.closeLoading = () => {
  if (loadingInstance) {
    setTimeout(() => {
      loadingInstance.close()
    }, 200)
  }
}
fetch.isResOk = res => !!res
fetch.isResLogout = res => res.code === 401
fetch.getErrorMsg = res => {
  try {
    return res.msg || res.info || res.message
  } catch (e) {
    return e.message
  }
}
fetch.promptMsg = msg => Message({ type: 'error', message: msg })
fetch.gotoLogin = error => {
  let authUrl = ''
  let needNewWindow = true
  if (error.response.request.responseURL.indexOf('/getLoginUserAllInfo') > -1) {
    needNewWindow = false
  }
  if (store.getters.useSSO) {
    let nowLocation = window.location.href
    if (needNewWindow) {
      nowLocation += nowLocation.indexOf('?') > -1 ? '&needClose=1' : '?needClose=1'
    }
    authUrl = error.response.headers.requires_auth_url + encodeURI(nowLocation)
  }
  store.dispatch('user/logOutByFetch', { authUrl, needNewWindow })
}

export default fetch.instance
