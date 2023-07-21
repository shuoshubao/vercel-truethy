const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const { bodyParser } = require('@koa/bodyparser');

const NpmStars = require('./api/npm/stars');

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

router.get('/', (ctx, next) => {
  ctx.body = '<h1>hello, Vercel</h1>';
});

router.get('/api/demo', (ctx, next) => {
  ctx.body = {
    code: 0,
    message: '',
    data: 'demo'
  };
});

router.get('/api/npm/stars', NpmStars);

app.use(router.routes());

app.use(router.allowedMethods());

app.use(async ctx => {
  ctx.body = 'hello koa.js';
});

app.listen(3000);
