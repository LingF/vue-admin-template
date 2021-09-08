// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'input',
    name: 'name',
    message: "请输入你要增加的页面的模块名称(小驼峰命名: my-page)"
  },
  {
    type: 'input',
    name: 'path',
    message: '请输入模块路径,路径会在 views/${path} 下创建 (例如：输入my/path 会创建 views/my/path/xxx 默认为空)',
  },
  {
    type: 'select',
    name: 'modal',
    message: '请选择模态框页面类型',
    choices: [{ message: 'Dialog + Form，Form 中一行有 两列 元素', value: 1 }, { message: 'Dialog + Form，Form 中一行有 一列 元素', value: 0 }]
  }
]
