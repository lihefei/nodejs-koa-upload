# Koa文件上传示例

## 安装
项目根目录下执行命令

```
npm install
```

## 目录说明
```
nodejs-koa-upload/
├── public/
│    ├── upload/           # 上传成功保存文件的位置
│    └── index.html        # 提交上传文件的页面
└── src/                   # 源文件 
     └── app.js            # 应用程序
```


## 启动程序

```
node ./src/app.js
```

## 访问上传文件页面
http://localhost:9900/index.html

## 访问上传成功的文件
http://localhost:9900/upload/文件名
