## AxiosInterceptorsX

AxiosInterceptorsX 是一个对 [axios的interceptor](https://github.com/axios/axios#interceptors) 的封装，主要解决日常开发中ajax请求时需要做拦截的操作
比如：ajax请求增加loading, 对返回的Payload解析的处理（弹出错误，登出等）

## How to use

```javascript
import AxiosInterceptorsX from './AxiosInterceptorsX.js'
const options = {
  // 是否自动删除 params中的空字段
  delEmpty: true,
  // 是否在请求时显示loading图标
  showLoading: true,
  // 是否自动提示错误
  autoPrompt: true,
  // 是否自动登出
  autoLogout: true,
  // axios的配置项 参考 axios
  axiosOptions: {
    baseURL: 'http://xxx.com',
    timeout: 1500
  }
}

const fetch = new AxiosInterceptorsX(options)
// 自定义显示loading
fetch.openLoading = () => {}
// 自定义隐藏loading
fetch.closeLoading = () => {}
// payload是否正确  (res为服务端返回的payload)
fetch.isResOk = function(res) { return res.code === 200 }
// payload是否需要登录   (res为服务端返回的payload)
fetch.isResLogout = function(res) { return res.code === 401 }
// payload中的错误信息  (res为服务端返回的payload)
fetch.getErrorMsg = function(res) { return res.msg }
// 当autoPrompt为true时如何提示错误
fetch.promptMsg = function(msg) { // your prompt function }
```