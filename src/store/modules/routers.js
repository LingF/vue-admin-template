import arrToTree from 'array-to-tree'

import { constantRoutes, asyncPageMap } from '@/router'
import Layout from '@/layout/index'
import EmptyLayout from '@/layout/EmptyLayout'

/**
 * 生成符合用户角色权限的路由表
 * @param {Object} asyncPageMap
 * @param {Array} permissionList
 * @returns
 */
function filterAsyncPage(asyncPageMap, permissionList) {
  // 把所有权限组装成路由的数据格式
  const routerList = permissionList.map(item => {
    return {
      id: item.id,
      pid: item.pid,
      path: item.code,
      component: item.value ? asyncPageMap[item.value] : null,
      // 如果 name 的值不存在，则该路由不会显示在导航栏的面包屑 Breadcrumb 中
      name: item.value ? item.name + item.id : null,
      meta: {
        title: item.name,
        icon: item.icon,
        pageName: item.value,
        id: item.id
      }
    }
  })

  // 获取指向具体页面的权限
  const pageList = routerList.filter(item => {
    return item.component
  })

  // 获取这些页面父节点的id(没有父节点的话，就传自己的id)，做去重处理
  const pidList = Array.from(new Set(pageList.map(item => item.pid || item.id)))

  // 设置菜单的 component 属性（递归）
  pidList.forEach(pid => {
    setParentComponent(pid, routerList)
  })

  // 筛选出所有的菜单
  const menuList = routerList.filter(item => {
    return item.component
  })

  // 拼装成树结构
  const result = arrToTree(menuList, { parentProperty: 'pid', customID: 'id' })

  // 筛选出只有一级的菜单，做封装处理
  result.forEach((item, index) => {
    if (!item.oneLevel) return
    result.splice(index, 1, {
      component: Layout,
      path: `/${item.path}`,
      meta: {
        title: item.meta.title
      },
      children: [item],
      redirect: `/${item.path}/${item.path}`,
      oneLevel: true
    })
  })

  return result
}

/**
 * 递归过设置路由对应的 component 属性
 * @param {Number} pid
 * @param {Array} routerList
 * @returns
 */
function setParentComponent(pid, routerList) {
  const parent = routerList.find(item => item.id === pid)
  if (!parent) return
  if (parent.component && !parent.multipleLevel) {
    parent.onLevel = true
  } else {
    parent.multipleLevel = true
    parent.component = parent.pid ? EmptyLayout : Layout
    if (parent.pid) {
      setParentComponent(parent.pid, routerList)
    } else if (parent.path.indexOf('/') !== 0) {
      parent.path = `/${parent.path}`
    }
  }
}

const routers = {
  state: {
    routers: constantRoutes,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers.concat([{
        path: '/*', component: () => import('@/views/404'), hidden: true
      }])
      state.routers = constantRoutes.concat(routers)
    }
  },
  actions: {
    generateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { permissionList } = data
        const accessedRouters = filterAsyncPage(asyncPageMap, permissionList || [])
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default routers
