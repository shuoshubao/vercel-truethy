const Router = require('@koa/router');
const RouterConfig = require('./routerConfig.json');

const router = new Router();

const Routerfiles = RouterConfig.map(v => {
  const url = `/${v}`;
  const { method, middleware } = require(`../${v}`);
  return {
    url,
    method,
    middleware
  };
});

router.get('/', (ctx, next) => {
  ctx.body = '<h1>hello, Vercel</h1>';
});

Routerfiles.forEach(v => {
  const { url, method, middleware } = v;

  router[method](url, middleware);
});

module.exports = app => {
  app.use(router.routes());

  app.use(router.allowedMethods());
};
