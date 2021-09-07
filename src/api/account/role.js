import fetch from '@/fetch'
/**
 * 角色管理
 */
// 获取列表
export function getRoleList(data) {
  return fetch({
    url: 'api/winSecurity/v1/role/getRoleList',
    method: 'get',
    params: data
  })
}
// 获取列表(分页)
export function getRolePage(data) {
  return fetch({
    url: 'api/winSecurity/v1/role/getRolePage',
    method: 'get',
    params: data
  })
}
// 获取角色
export function getRole(data) {
  return fetch({
    url: 'api/winSecurity/v1/role/getRole',
    method: 'get',
    params: data
  })
}
// 更新
export function updateRole(data) {
  return fetch({
    url: 'api/winSecurity/v1/role/updateRole',
    method: 'post',
    data: data
  })
}
// 新增
export function addRole(data) {
  return fetch({
    url: 'api/winSecurity/v1/role/addRole',
    method: 'post',
    data: data
  })
}
// 删除
export function deleteRole(data) {
  return fetch({
    url: 'api/winSecurity/v1/role/deleteRole',
    method: 'post',
    data: data
  })
}
