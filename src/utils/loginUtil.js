import { MessageBox } from 'element-ui'

let newWindow = null
let showMessageBox = false

export const creatLoginWindow = function (url) {
  if (!newWindow || newWindow.closed) {
    newWindow = window.open(url || '#/login?needClose=1')
    showMessageBox = false
  } else {
    if (!showMessageBox) {
      MessageBox.alert('当前状态为未登录，请重新登陆', '温馨提示', {
        confirmButtonText: '知道了'
      }).then(() => {
        showMessageBox = false
      }).catch(() => {
        showMessageBox = false
      })
      showMessageBox = true
    }
  }
}
