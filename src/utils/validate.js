/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 密码
 * @param {String} password
 * @returns
 */
export function validatePassword(password) {
  // const reg = /^(?!\\d+$)(?![a-zA-Z]+$)[a-zA-Z\\d]{8,}$/
  // const reg = /\w{8,}$/
  // 规则: 至少8位、
  const reg = /^[a-zA-Z0-9_]{8,}$/
  const reg1 = /[a-zA-Z_]/
  return reg.test(password) && reg1.test(password)
}