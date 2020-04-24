# vue-cli-ssr-demo,基于vuecli改造的，基本上的架子都有，请根据需要自行改造
## demo包含了：
### 开发环境热更新
### 数据预取
### 状态管理vuex
### 路由管理vuerouter
### 页面头部信息更新，比如：title, meta等信息更改，请查看vue-meta的教程
### 正式环境打包后的测试服务器，加入了页面缓存
#### 至于为什么要打包一个index-bak.html, 是因为访问根目录的时候服务器会默认拉取index.html，而没有走模板会导致查看源码的时候是index.html的数据
#### 为什么不删除html-webpack-plugin不让它自动生成index.html，是因为配置chainWebpack删除后打包会出错, 所以就只有改成index-bak.html

## 安装（国内用户还是cnpm快一点)
```
npm install
```

### 开发环境
```
npm run dev
```

### 正式环境
```
npm run build
```