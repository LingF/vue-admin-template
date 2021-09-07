import fetch from '@/fetch'
import { delEmptyParams } from '@/utils/index'
/**
 * 账号管理
 */
// 账号列表
export function getUserList(params) {
  return fetch({
    url: 'api/winSecurity/v1/user/getUserList',
    method: 'get',
    params: delEmptyParams(params)
  })
}
// 账号列表（分页）
export function getUserPage(params) {
  return fetch({
    url: 'api/winSecurity/v1/user/getUserPage',
    method: 'get',
    params: delEmptyParams(params)
  })
}
// 删除账号
export function deleteUser(params) {
  return fetch({
    url: 'api/winSecurity/v1/user/deleteUser',
    method: 'post',
    data: delEmptyParams(params)
  })
}
// 新增
export function addUser(params) {
  return fetch({
    url: 'api/winSecurity/v1/user/addUser',
    method: 'post',
    data: delEmptyParams(params)
  })
}
// 更新
export function updateUser(params) {
  return fetch({
    url: 'api/winSecurity/v1/user/updateUser',
    method: 'post',
    data: delEmptyParams(params)
  })
}
// 详情
export function getUser(params) {
  return fetch({
    url: 'api/winSecurity/v1/user/getUser',
    method: 'get',
    params: delEmptyParams(params)
  })
}
