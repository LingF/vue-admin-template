import axios from 'axios'
import router from '@/router'

const customMethods = [
  'openLoading',
  'closeLoading',
  'isResOk',
  'isResLogout',
  'gotoLogin',
  'getErrorMsg',
  'promptMsg'
]

class AxiosInterceptorsX {
  constructor(options) {
    // 是否自动删除空字符串的参数 (只对 get 方法的 params 有效)
    this.delEmpty = options.delEmpty || false
    // 是否显示 loading
    this.showLoading = options.showLoading || false
    // 是否自动登出(在接口 返回需要登录时自动登出)
    this.autoLogout = options.autoLogout || false
    customMethods.forEach(key => {
      this[key] = () => console.log(`Please set your ${key} method`)
    })
    this.instance = create.call(this, options)
    // 多个 ajax 请求时的 计数器
    this.count = 0
  }
}

function create(options) {
  const axiosOptions = options.axiosOptions
  const service = axios.create(axiosOptions)
  initInterceptors.call(this, options, service)
  return service
}

function initInterceptors(options, service) {
  const self = this
  let showLoading, autoPrompt, autoLogout
  service.interceptors.request.use(config => {
    showLoading = isThisBoolean(config.showLoading, options.showLoading)
    autoPrompt = isThisBoolean(config.autoPrompt, options.autoPrompt)
    autoLogout = isThisBoolean(config.autoLogout, options.autoLogout)
    if (showLoading) {
      if (this.count === 0) {
        self.openLoading()
      }
      this.count++
    }
    if (options.delEmpty && config.method === 'get') {
      config.params = delEmpty(config.params)
    }
    return config
  })

  service.interceptors.response.use(response => {
    const config = response.config
    showLoading = isThisBoolean(config.showLoading, options.showLoading)
    autoPrompt = isThisBoolean(config.autoPrompt, options.autoPrompt)
    autoLogout = isThisBoolean(config.autoLogout, options.autoLogout)
    // axios 返回值会封装一层数据，真是的数据会在 data 里
    const res = response.data
    if (showLoading) {
      this.count--
      if (this.count === 0) {
        self.closeLoading()
      }
    }
    if (self.isResOk(res) || response.status === 200) {
      return res
    } else {
      if (autoLogout && self.isResLogout(res)) {
        self.gotoLogin()
        return Promise.reject(res)
      }
      if (autoPrompt) {
        self.promptMsg(self.getErrorMsg(res))
      }
      return Promise.reject(res)
    }
  }, e => {
    showLoading = isThisBoolean(e.showLoading, options.showLoading)
    autoPrompt = isThisBoolean(e.autoPrompt, options.autoPrompt)
    autoLogout = isThisBoolean(e.autoLogout, options.autoLogout)
    if (showLoading) {
      this.count--
      if (this.count === 0) {
        self.closeLoading()
      }
    }
    if (autoLogout && e && e.response && e.response.status === 401) {
      self.gotoLogin(e)
    } else if (e && e.response && e.response.status === 403) {
      router.push('/403')
    } else if (autoPrompt) {
      self.promptMsg(self.getErrorMsg(e))
    }
    return Promise.reject(e)
  })
}

function isThisBoolean(bool, val) {
  if (typeof bool === 'boolean') {
    return bool
  } else {
    return Boolean(val)
  }
}

function delEmpty(obj) {
  for (var pro in obj) {
    const val = obj[pro]
    if (val === '' || val === undefined || val === null) {
      delete obj[pro]
    }
    if (typeof val === 'string') {
      obj[pro] = obj[pro].trim()
    }
  }
  return obj
}

export default AxiosInterceptorsX