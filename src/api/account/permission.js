import fetch from '@/fetch'
/**
 * 权限管理
 */
// 新建
export function addPermission(data) {
  return fetch({
    url: 'api/winSecurity/v1/resource/addResource',
    method: 'post',
    data: data
  })
}
// 删除
export function deletePermission(data) {
  return fetch({
    url: 'api/winSecurity/v1/resource/deleteResource',
    method: 'post',
    data: data
  })
}
// 更新
export function updatePermission(data) {
  return fetch({
    url: 'api/winSecurity/v1/resource/updateResource',
    method: 'post',
    data: data
  })
}
// 获取权限详情
export function getPermissionDetail(data) {
  return fetch({
    url: 'api/winSecurity/v1/resource/getResource',
    method: 'get',
    params: data
  })
}
// 获取列表
export function getPermissions(data) {
  return fetch({
    url: 'api/winSecurity/v1/resource/getResourceList',
    method: 'get',
    params: data
  })
}
// 拖动权限位置
export function dragAndDropResource(data) {
  return fetch({
    url: 'api/winSecurity/v1/resource/dragAndDropResource',
    method: 'post',
    data: data
  })
}
// 批量修改权限位置
export function updateResourceBatch(data) {
  return fetch({
    url: 'api/winSecurity/v1/resource/updateResourceBatch',
    method: 'post',
    data: data
  })
}
