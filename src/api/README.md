## 权限接口文档

### resource

#### 删除资源

_POST_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/resource/deleteResource
```

请求体
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| code | Number |  |
| msg | String |  |
| data | Object |  |


#### 批量更新资源

_POST_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/resource/updateResourceBatch
```

请求体
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| idList | Array | 待移动元素ID列表 |
| targetParentId | Number | 目标位置父元素ID |

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| code | Number | 状态 200:成功,400:失败,500:服务器内部错误 |
| msg | String | 提示信息 |
| data | Object | 业务数据 |


#### 拖拉资源位置

_POST_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/resource/dragAndDropResource
```

请求体
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 当前元素ID |
| targetParentId | Number | 目标位置父元素ID |
| targetUpId | Number | 目标位置上面的元素ID |
| targetDownId | Number | 目标位置下面的元素ID |

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |
| createTime | Number | 创建时间 |
| updateTime | Number | 更新时间 |
| name | String | 名称 |
| code | String | 编码 |
| globalCode | String | 全局唯一编码 |
| value | String | 值 |
| ajaxUrls | String | 后端接口地址，支持多个，中间用,隔开 |
| description | String | 描述 |
| icon | String | 图标 |
| pid | Number | 上级父ID |
| seq | Number | 排序 |
| status | Number | 状态，0:无效 , 1:有效 |
| resourceType | Number | 资源类别, 0:无特别作用，1:菜单，2:其他 |


#### 新增资源

_POST_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/resource/addResource
```

请求体
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| name | String | 名称 |
| code | String | 编码 |
| value | String | 值 |
| ajaxUrls | String | 后端接口地址，支持多个，中间用,隔开 |
| description | String | 描述 |
| icon | String | 图标 |
| pid | Number | 上级父ID |
| seq | Number | 排序 |
| status | Number | 状态，0:无效 , 1:有效 |
| resourceType | Number | 资源类别, 0:无特别作用，1:菜单，2:其他 |

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |
| createTime | Number | 创建时间 |
| updateTime | Number | 更新时间 |
| name | String | 名称 |
| code | String | 编码 |
| globalCode | String | 全局唯一编码 |
| value | String | 值 |
| ajaxUrls | String | 后端接口地址，支持多个，中间用,隔开 |
| description | String | 描述 |
| icon | String | 图标 |
| pid | Number | 上级父ID |
| seq | Number | 排序 |
| status | Number | 状态，0:无效 , 1:有效 |
| resourceType | Number | 资源类别, 0:无特别作用，1:菜单，2:其他 |


#### 更新资源

_POST_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/resource/updateResource
```

请求体
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| name | String | 名称 |
| code | String | 编码 |
| value | String | 值 |
| ajaxUrls | String | 后端接口地址，支持多个，中间用,隔开 |
| description | String | 描述 |
| icon | String | 图标 |
| pid | Number | 上级父ID |
| seq | Number | 排序 |
| status | Number | 状态，0:无效 , 1:有效 |
| resourceType | Number | 资源类别, 0:无特别作用，1:菜单，2:其他 |

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |
| createTime | Number | 创建时间 |
| updateTime | Number | 更新时间 |
| name | String | 名称 |
| code | String | 编码 |
| globalCode | String | 全局唯一编码 |
| value | String | 值 |
| ajaxUrls | String | 后端接口地址，支持多个，中间用,隔开 |
| description | String | 描述 |
| icon | String | 图标 |
| pid | Number | 上级父ID |
| seq | Number | 排序 |
| status | Number | 状态，0:无效 , 1:有效 |
| resourceType | Number | 资源类别, 0:无特别作用，1:菜单，2:其他 |


#### 获取资源

_GET_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/resource/getResource
```

请求体
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |
| createTime | Number | 创建时间 |
| updateTime | Number | 更新时间 |
| name | String | 名称 |
| code | String | 编码 |
| globalCode | String | 全局唯一编码 |
| value | String | 值 |
| ajaxUrls | String | 后端接口地址，支持多个，中间用,隔开 |
| description | String | 描述 |
| icon | String | 图标 |
| pid | Number | 上级父ID |
| seq | Number | 排序 |
| status | Number | 状态，0:无效 , 1:有效 |
| resourceType | Number | 资源类别, 0:无特别作用，1:菜单，2:其他 |


#### 获取资源列表

*支持动态查询数据，参数放到URL中*
_GET_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/resource/getResourceList
```

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |
| createTime | Number | 创建时间 |
| updateTime | Number | 更新时间 |
| name | String | 名称 |
| code | String | 编码 |
| globalCode | String | 全局唯一编码 |
| value | String | 值 |
| ajaxUrls | String | 后端接口地址，支持多个，中间用,隔开 |
| description | String | 描述 |
| icon | String | 图标 |
| pid | Number | 上级父ID |
| seq | Number | 排序 |
| status | Number | 状态，0:无效 , 1:有效 |
| resourceType | Number | 资源类别, 0:无特别作用，1:菜单，2:其他 |
| belongRoles | String | 属于哪些角色拥有，中间用,隔开， NULL不限制 |


### role

#### 删除角色

_POST_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/role/deleteRole
```

请求体
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| code | Number |  |
| msg | String |  |
| data | Object |  |


#### 新增角色

_POST_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/role/addRole
```

请求体
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| name | String | 角色名称 |
| description | String | 描述 |
| seq | Number | 排序 |
| status | Number | 状态, 0:无效 , 1:有效 |
| resourceIdList | Array | 资源ID列表 |

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |
| createTime | Number | 创建时间 |
| updateTime | Number | 更新时间 |
| name | String | 角色名称 |
| description | String | 描述 |
| seq | Number | 排序 |
| status | Number | 状态, 0:无效 , 1:有效 |
| resourceIdList | Array | 资源ID列表 |


#### 更新角色

_POST_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/role/updateRole
```

请求体
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| name | String | 角色名称 |
| description | String | 描述 |
| seq | Number | 排序 |
| status | Number | 状态, 0:无效 , 1:有效 |
| resourceIdList | Array | 资源ID列表 |

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |
| createTime | Number | 创建时间 |
| updateTime | Number | 更新时间 |
| name | String | 角色名称 |
| description | String | 描述 |
| seq | Number | 排序 |
| status | Number | 状态, 0:无效 , 1:有效 |
| resourceIdList | Array | 资源ID列表 |


#### 获取角色

_GET_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/role/getRole
```

请求体
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |
| createTime | Number | 创建时间 |
| updateTime | Number | 更新时间 |
| name | String | 角色名称 |
| description | String | 描述 |
| seq | Number | 排序 |
| status | Number | 状态, 0:无效 , 1:有效 |
| resourceIdList | Array | 资源ID列表 |


#### 获取角色分页数据

*支持动态查询数据，参数放到URL中*
_GET_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/role/getRolePage
```

请求体
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| name | String | 角色名称 |
| status | Number | 状态, 0:无效 , 1:有效 |
| pageNum | Number | 第几页 |
| pageSize | Number | 每页数量 |

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| pageNum | Number | 第几页 |
| pageSize | Number | 每页数量 |
| totalRow | Number | 总数据量 |
| totalPage | Number | 总页数 |
| orderProperty | Object | 排序字段 |
| orderDirection | Object | 升序:ASC，降序:DESC |
| list | Array | 列表 |
|  - id | Number | 主键 |
|  - createTime | Number | 创建时间 |
|  - updateTime | Number | 更新时间 |
|  - name | String | 角色名称 |
|  - description | String | 描述 |
|  - seq | Number | 排序 |
|  - status | Number | 状态, 0:无效 , 1:有效 |
| startRow | Number | 本页起始行 |


#### 获取角色列表

*支持动态查询数据，参数放到URL中*
_GET_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/role/getRoleList
```

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |
| createTime | Number | 创建时间 |
| updateTime | Number | 更新时间 |
| name | String | 角色名称 |
| description | String | 描述 |
| seq | Number | 排序 |
| status | Number | 状态, 0:无效 , 1:有效 |


### user

#### 删除用户

_POST_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/user/deleteUser
```

请求体
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| code | Number |  |
| msg | String |  |
| data | Object |  |


#### 新增用户

_POST_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/user/addUser
```

请求体
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| userName | String | 登录名 |
| name | String | 姓名 |
| mobile | String | 手机号 |
| status | Number | 用户状态, 状态, 0:无效 , 1:有效 |
| roleIdList | Array | 角色ID列表 |

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |
| createTime | Number | 创建时间 |
| updateTime | Number | 更新时间 |
| userName | String | 登录名 |
| name | String | 姓名 |
| mobile | String | 手机号 |
| status | Number | 用户状态, 状态, 0:无效 , 1:有效 |
| roleIdList | Array | 角色ID列表 |


#### 更新用户

_POST_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/user/updateUser
```

请求体
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| userName | String | 登录名 |
| name | String | 姓名 |
| mobile | String | 手机号 |
| status | Number | 用户状态, 状态, 0:无效 , 1:有效 |
| roleIdList | Array | 角色ID列表 |

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |
| createTime | Number | 创建时间 |
| updateTime | Number | 更新时间 |
| userName | String | 登录名 |
| name | String | 姓名 |
| mobile | String | 手机号 |
| status | Number | 用户状态, 状态, 0:无效 , 1:有效 |
| roleIdList | Array | 角色ID列表 |


#### 获取用户

_GET_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/user/getUser
```

请求体
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |
| createTime | Number | 创建时间 |
| updateTime | Number | 更新时间 |
| userName | String | 登录名 |
| name | String | 姓名 |
| mobile | String | 手机号 |
| status | Number | 用户状态, 状态, 0:无效 , 1:有效 |
| roleIdList | Array | 角色ID列表 |


#### 获取用户分页数据

*支持动态查询数据，参数放到URL中*
_GET_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/user/getUserPage
```

请求体
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| userName | String | 登录名,支持模糊搜索searchWord% |
| mobile | String | 手机号,支持模糊搜索searchWord% |
| status | Number | 用户状态, 状态, 0:无效 , 1:有效 |
| pageNum | Number | 第几页 |
| pageSize | Number | 每页数量 |

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| pageNum | Number | 第几页 |
| pageSize | Number | 每页数量 |
| totalRow | Number | 总数据量 |
| totalPage | Number | 总页数 |
| orderProperty | Object | 排序字段 |
| orderDirection | Object | 升序:ASC，降序:DESC |
| list | Array | 列表 |
|  - id | Number | 主键 |
|  - createTime | Number | 创建时间 |
|  - updateTime | Number | 更新时间 |
|  - userName | String | 登录名 |
|  - name | String | 姓名 |
|  - mobile | String | 手机号 |
|  - status | Number | 状态, 0:无效 , 1:有效 |
| startRow | Number | 本页起始行 |


#### 获取用户列表

*支持动态查询数据，参数放到URL中*
_GET_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/user/getUserList
```

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |
| createTime | Number | 创建时间 |
| updateTime | Number | 更新时间 |
| userName | String | 登录名 |
| name | String | 姓名 |
| mobile | String | 手机号 |
| status | Number | 用户状态, 状态, 0:无效 , 1:有效 |


### winSecurity

#### 模拟登出(非正式接口)

_POST_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/access/logout
```

#### 模拟登陆(非正式接口)

_POST_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/access/login
```

请求体
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| userName | String | 登录名 |
| password | String | 密码，{userName}@winbaoxian.com 的md5值（字母大写） |


#### 获取登陆用户信息

_GET_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/access/getLoginUserInfo
```

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |
| createTime | Number | 创建时间 |
| updateTime | Number | 更新时间 |
| userName | String | 登录名 |
| name | String | 姓名 |
| mobile | String | 手机号 |
| status | Number | 用户状态, 状态, 0:无效 , 1:有效 |
| roleIdList | Array | 角色ID列表 |


#### 获取登录用户所有信息

_GET_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/access/getLoginUserAllInfo
```

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| userInfo | Object | 用户信息 |
|  - id | Number | 主键 |
|  - createTime | Number | 创建时间 |
|  - updateTime | Number | 更新时间 |
|  - userName | String | 登录名 |
|  - name | String | 姓名 |
|  - mobile | String | 手机号 |
|  - status | Number | 用户状态, 状态, 0:无效 , 1:有效 |
|  - roleIdList | Array | 角色ID列表 |
| roleList | Array | 角色信息 |
|  - id | Number | 主键 |
|  - createTime | Number | 创建时间 |
|  - updateTime | Number | 更新时间 |
|  - name | String | 角色名称 |
|  - description | String | 描述 |
|  - seq | Number | 排序 |
|  - status | Number | 状态, 0:无效 , 1:有效 |
| resourceList | Array | 资源列表 |
|  - id | Number | 主键 |
|  - createTime | Number | 创建时间 |
|  - updateTime | Number | 更新时间 |
|  - name | String | 名称 |
|  - code | String | 编码 |
|  - globalCode | String | 全剧唯一编码 |
|  - value | String | 值 |
|  - description | String | 描述 |
|  - icon | String | 图标 |
|  - pid | Number | 上级父ID |
|  - seq | Number | 排序 |
|  - status | Number | 状态，0:无效 , 1:有效 |
|  - resourceType | Number | 资源类别, 0:无特别作用，1:菜单，2:其他 |


#### 获取登录用户角色列表

_GET_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/access/getLoginUserRoleList
```

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |
| createTime | Number | 创建时间 |
| updateTime | Number | 更新时间 |
| name | String | 角色名称 |
| description | String | 描述 |
| seq | Number | 排序 |
| status | Number | 状态, 0:无效 , 1:有效 |


#### 获取登陆用户资源列表

_GET_

``` cmd
https://apidoc-mock.xxx.cn/spring-biz-module/api/winSecurity/v1/access/getLoginUserResourceList
```

响应结果
| 字段 | 类型 | 描述 |
| ---- | ---- | ---- |
| id | Number | 主键 |
| createTime | Number | 创建时间 |
| updateTime | Number | 更新时间 |
| name | String | 名称 |
| code | String | 编码 |
| globalCode | String | 全局唯一编码 |
| value | String | 值 |
| description | String | 描述 |
| icon | String | 图标 |
| pid | Number | 上级父ID |
| seq | Number | 排序 |
| status | Number | 状态，0:无效 , 1:有效 |
| resourceType | Number | 资源类别, 0:无特别作用，1:菜单，2:其他 |