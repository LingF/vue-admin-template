const getters = {
  // 权限系统默认
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  useSSO: state => state.app.useSSO,
  name: state => state.user.name,
  userName: state => state.user.userName,
  avatar: state => state.user.avatar,
  isLoggedIn: state => state.user.isLoggedIn,
  permissionList: state => state.user.permissionList,
  pagePermission: state => state.user.pagePermission,
  roleList: state => state.user.roleList,
  addRouters: state => state.routers.addRouters,
  permission_routers: state => state.routers.routers
}
export default getters
