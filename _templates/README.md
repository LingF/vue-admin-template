# 使用模版生成页面

本项目使用了 [hygen](https://github.com/jondot/hygen) 生成模版

## hygen 使用

[文档](http://www.hygen.io/docs/quick-start)

### 全局安装hygen

``` cmd
npm i -g hygen
```

### 初始化项目

``` cmd
hygen init self
```

项目中生成 _templates 文件夹


#### 普通构建器

1. 构建第一个自己的构建器

  ```bash
  hygen generator new mygen
  ```
  
  _templates/mygen

2. 使用构建器创建文件

   new 就是 mygen 文件夹下面的 new 文件夹，执行会创建 new 文件夹下面的所 有模版

   ``` sh
   hygen mygen new
   ```

   文件里的 to 代表生成的文件要插入的路径和文件类型

3. 自定义创建文件

   通过 <%= key %> 自定义文件名、赋值

   ``` ejs
   ---
   to: app/<%= folder %>/<%= name %>.js
   ---
   const fileName = '<%= name %>'
   const hello = '<%= message %>'
  
   console.log(fileName)
   console.log(hello)
   ```

#### 交互式的构建器

1. 创建

   ```sh
   hygen generator with-prompt mygen
   ```

   通过默认的 generator 创建一个带交互提示的构建器，得到 with-prompt 的文件夹，与 new 文件夹相比多了 prompt.js

2. 模版文件和 prompt.js

   hello.ejs.t（模版名可以修改）：

   ```ejs
   ---
   to: src/<%= folder %>/<%= name %>.js
   ---
   const hello = <%= name %>
   
   console.log(hello)
   ```

   prompt.js ：

   ```javascript
   module.exports = [
     {
       type: 'input',
       name: 'folder',
       message: '请输入文件夹名：',
       validate(value) {
         if(!value.length) {
           return '文件夹名不能为空！'
         }
         return true
       }
     },
     {
       type: 'input',
       name: 'name',
       message: '请输入文件名：',
       validate(value) {
         if(!value.length) {
           return '文件名不能为空！'
         }
         return true
       }
     }
   ]
   ```

3. 使用构建器创建文件

   ```sh
   hygen mygen with-prompt
   ```

   执行命令后进入预先设置的问题

   传入模版的参数除了输入的方式，还有选择的方式：

   ```javascript
   module.exports = [
     {
       type: 'select',
       name: 'folder',
       message: '请选择文件夹',
       choices: [{ message: 'testFolder目录', value: 'testFolder' }, { message: 'views目录', value: 'views' }]
     }
   ]
   ```

## 已建模板（直接使用）

### 表格页面模版（tablelist）

- `common.ejs.t` 表格页面 Form + Table + Pagination
- `detail-modal-single.ejs.t` 模态框页面 Dialog + Form，Form 中一行有 两列 元素
- `detail-modal.ejs.t` 模态框页面 Dialog + Form，Form 中一行有 一列 元素

> _模态框 modal_ 新建时二选一

``` cmd
hygen tablelist with-prompt
```

创建模版之后，在`src/router/index.js`中的`asyncPageMap`添加对应路由，然后通过权限系统配置相关的权限、角色、账号，即可看到相关页面
