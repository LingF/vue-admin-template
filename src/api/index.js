export * from './table'

export function getDetail(params) {
  return fetch({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getTableList(params) {
  return fetch({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
