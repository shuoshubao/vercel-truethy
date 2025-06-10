/*
 * @Author: shuoshubao
 * @Date: 2025-06-05 19:39:23
 * @LastEditors: shuoshubao
 * @LastEditTime: 2025-06-07 01:11:18
 * @Description: 主入口
 */
import { bodyParser } from '@koa/bodyparser';
import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import koaStatic from 'koa-static';
import os from 'os';
import * as apis from './api/index.js';

const app = new Koa();

app.use(cors());

app.use(koaStatic('public'));
app.use(koaStatic('dist'));

app.use(bodyParser());

const router = new Router();

Object.values(apis).forEach(item => {
    const { url, method, middleware } = item;
    router[method](url, middleware);
});

app.use(router.routes());

app.use(router.allowedMethods());

if (os.platform() === 'darwin' && !process.env.__VERCEL_DEV_RUNNING) {
    app.listen(3000);
}

export default app.callback();
