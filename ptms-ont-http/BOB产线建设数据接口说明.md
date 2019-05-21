# BOB产线建设数据接口文档

_日期：2016-12-14_
## 接口说明

### bosaInfo表写入数据
`通过索引对bosaInfo表写入数据`
#### 接口请求地址
`[URL_PREFIX]/api/v1/bosaInfo/set?params={"bosasn":"B15A17015315"}`
#### 请求地址示例
http://localhost:3000/api/v1/bosaInfo/set?params={"bosasn":"B15A17015315"}
#### 请求路径说明

参数名  | 参数说明
-----  | --------
api    | 服务
v1    　| 版本号
bosaInfo　| 表名称
set | 写入数据
params | 参数容器

#### 请求参数说明
参数名  |  数据类型 | 参数说明
-----  | -------- | --------
bosasn | String | bosasn（索引项必须存在，不然无法写入数据）

#### 返回参数说明

参数名  | 返回值类型 | 参数说明 |
------ | ------ | ----------
result | String | 操作结果

#### 返回值示例
```
{"result":"success"}表示成功
{"result":"fail"}表示失败
```

### bosaInfo表数据获取
`通过索引获取bosaInfo表中的一条数据`
#### 接口请求地址
`[URL_PREFIX]/api/v1/bosaInfo/get?params={"bosasn":"B15A17015315"}`
#### 请求地址示例
http://localhost:3000/api/v1/bosaInfo/get?params={"bosasn":"B15A17015315"}
#### 请求路径说明

参数名  | 参数说明
-----  | --------
api    | 服务
v1    　| 版本号
bosaInfo　| 表名称
get | 读取数据
params | 参数容器

#### 请求参数说明
参数名  |  数据类型 | 参数说明
-----  | -------- | --------
bosasn | String | bosasn

#### 返回参数说明

参数名  | 返回值类型 | 参数说明 |
------ | ------ | ----------
result | String | 操作结果

#### 返回值示例
```
{
  "bosasn":"B15A17015315",
  "imod":"419",
  "vbr":"49",
  "result":"success"
}
或者
{"result":"fail"}表示失败
以上数据除result外为虚拟数据，具体键值对和表的字段同步
```

### deviceInfo表写入数据
`通过索引对deviceInfo表写入数据`
#### 接口请求地址
`[URL_PREFIX]/api/v1/deviceInfo/set?params={"boardsn":"B15A17015315"}`
#### 请求地址示例
http://localhost:3000/api/v1/deviceInfo/set?params={"boardsn":"B15A17015315"}
#### 请求路径说明

参数名  | 参数说明
-----  | --------
api    | 服务
v1     | 版本号
deviceInfo | 表名称
set | 写入数据
params | 参数容器

#### 请求参数说明
参数名  |  数据类型 | 参数说明
-----  | -------- | --------
boardsn | String | boardsn（索引项必须存在，不然无法写入数据）

#### 返回参数说明

参数名  | 返回值类型 | 参数说明 |
------ | ------ | ----------
result | String | 操作结果

#### 返回值示例
```
{"result":"success"}表示成功
{"result":"fail"}表示失败
```

### deviceInfo表数据获取
`通过索引获取bosaInfo表中的一条数据`
#### 接口请求地址
`[URL_PREFIX]/api/v1/deviceInfo/get?params={"boardsn":"B15A17015315"}`
#### 请求地址示例
http://localhost:3000/api/v1/deviceInfo/get?params={"boardsn":"B15A17015315"}
#### 请求路径说明

参数名  | 参数说明
-----  | --------
api    | 服务
v1    　| 版本号
deviceInfo　| 表名称
get | 读取数据
params | 参数容器

#### 请求参数说明
参数名  |  数据类型 | 参数说明
-----  | -------- | --------
boardsn | String | boardsn

#### 返回参数说明

参数名  | 返回值类型 | 参数说明 |
------ | ------ | ----------
result | String | 操作结果

#### 返回值示例
```
{
  "bosasn":"B15A17015315",
  "imod":"419",
  "vbr":"49",
  "result":"success"
}
或者
{"result":"fail"}表示失败
以上数据除result外为虚拟数据，具体键值对和表的字段同步
```

### labelInfo表写入数据
`通过索引对labelInfo表写入数据`
#### 接口请求地址
`[URL_PREFIX]/api/v1/labelInfo/set?params={"labelsn":"B15A17015315"}`
#### 请求地址示例
http://localhost:3000/api/v1/labelInfo/set?params={"labelsn":"B15A17015315"}
#### 请求路径说明

参数名  | 参数说明
-----  | --------
api    | 服务
v1     | 版本号
deviceInfo | 表名称
set | 写入数据
params | 参数容器

#### 请求参数说明
参数名  |  数据类型 | 参数说明
-----  | -------- | --------
labelsn | String | labelsn（索引项必须存在，不然无法写入数据）

#### 返回参数说明

参数名  | 返回值类型 | 参数说明 |
------ | ------ | ----------
result | String | 操作结果

#### 返回值示例
```
{"result":"success"}表示成功
{"result":"fail"}表示失败
```
### labelInfo表数据获取
`通过索引对labelInfo表数据获取`
#### 接口请求地址
`[URL_PREFIX]/api/v1/labelInfo/get?params={"labelsn":"B15A17015315"}`
#### 请求地址示例
http://localhost:3000/api/v1/labelInfo/get?params={"labelsn":"B15A17015315"}
#### 请求路径说明

参数名  | 参数说明
-----  | --------
api    | 服务
v1    　| 版本号
deviceInfo　| 表名称
get | 读取数据
params | 参数容器

#### 请求参数说明
参数名  |  数据类型 | 参数说明
-----  | -------- | --------
labelsn | String | labelsn（索引项必须存在，不然无法写入数据）

#### 返回参数说明

参数名       | 返回值类型 | 参数说明 |
----------- | ------ | ----------
result | String | 操作结果

#### 返回值示例
```
{
  "bosasn":"B15A17015315",
  "imod":"419",
  "vbr":"49",
  "result":"success"
}
或者
{"result":"fail"}表示失败
以上数据除result外为虚拟数据，具体键值对和表的字段同步
```
## 更新日志
时间      | 操作人 | 详情
-----     | ----- | ----
2016-12-14  | LuoW  | bosaInfo,deviceInfo,labelInfo表的数据写入和读取的接口更新
