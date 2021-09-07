import fetch from '@/fetch'
import qs from 'qs'

export function loginUserInfo() {
  return fetch({
    url: '/api/winSecurity/v1/access/getLoginUserInfo',
    method: 'get'
  })
}

// 获取登录信息（判断登录状态）
export function loginStatus() {
  return fetch({
    url: '/api/winSecurity/v1/access/getLoginUserResourceList',
    method: 'get'
  })
}

// 登出
export function logout() {
  return fetch({
    url: '/userManager/logout', // 请根据实际情况替换 url 的值
    method: 'post'
  })
}

// 登录
export function login(userName, password) {
  return fetch({
    url: '/userManager/login', // 请根据实际情况替换 url 的值
    method: 'post',
    data: qs.stringify({ userName, password }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
