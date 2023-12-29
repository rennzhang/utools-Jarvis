> Power By https://github.com/bravekingzhang/utools-plugin-template


## 插件说明

开发一个自己使用的 uTools 工具集，我暂时叫他 Jarvis. (钢铁侠中的贾维斯)

### 功能

1. 复制 cURL 转换为 TS 函数，并包含入参的 TS 类型；
  - 目前个人使用，只支持固定格式（代码写死），后续考虑支持配置模板


## 开发说明

### 开发
- git clone 本项目
- yarn && yarn start  会启动一个 local server ，监听3000端口，utools开发模式可以指向 local server，具体可以看plugin.json描述
- 在utools开发者工具中创建项目，配置plugin文件目录为 dist 目录下的那个即可开始开发了，如下图
<img src="https://github.com/bravekingzhang/utools-plugin-template/blob/main/doc/utoos-config.png" alt="配置" style="width: 40%;" />

Volar 取代了之前为 Vue 2 提供的官方 VSCode 扩展 Vetur。如果你之前已经安装了 Vetur，请确保在 Vue 3 的项目中禁用它。

#### 打包
yarn build 会打包构建项目，构建会在dist目录下面，当然也感谢@csj8520大佬写的vite插件同时构建了一个.upx。
- 上传插件可以直接使用dist 目录下的上传。
- .upx可以拿来分享

## 注意事项
- 注意修改 public/plugin.json 下面的相关信息
- 注意修改 package.json 里面的项目信息

