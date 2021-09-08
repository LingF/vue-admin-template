import fetch from '@/fetch'

export function getList(params) {
  return fetch({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
