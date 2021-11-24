const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const app = new Koa();
const router = new Router();

app.use(
    koaBody({
        multipart: true, // 开启文件上传
        formidable: {
            maxFileSize: 500 * 1024 * 1024, // 设置上传文件大小最大限制，默认5M
            keepExtensions: true, // 保留文件拓展名
        },
    })
);

// 上传单个文件
router.post('/api/uploadfile', async (ctx) => {
    const file = ctx.request.files.file; // 获取文件
    const reader = fs.createReadStream(file.path); // 创建可读流
    const filePath = path.join(__dirname, `../public/upload/${file.name}`); // 文件保存的路径;
    const upStream = fs.createWriteStream(filePath); // 创建可写流
    reader.pipe(upStream); // 可读流通过管道写入可写流

    ctx.body = '上传成功';
});

// 上传多个文件
router.post('/api/uploadfiles', async (ctx) => {
    const files = ctx.request.files.file; // 获取上传文件
    for (let file of files) {
        const reader = fs.createReadStream(file.path); // 创建可读流
        const filePath = path.join(__dirname, `../public/upload/${file.name}`); // 文件保存的路径
        const upStream = fs.createWriteStream(filePath); // 创建可写流
        reader.pipe(upStream); // 可读流通过管道写入可写流
    }

    ctx.body = '上传成功！';
});

app.use(router.routes());

// 静态资源服务
const static = koaStatic(path.join(__dirname, '../public'));
app.use(static);

const hostName = 'localhost';
const port = 9900;
app.listen(port, hostName, () => {
    console.log(`服务运行在http://${hostName}:${port}`);
});
console.log('成功启动');
