const { resolve, relative } = require('path');
const Router = require('@koa/router');
const glob = require('glob');

const cwd = process.cwd();

const router = new Router();

const Routerfiles = glob.sync(resolve(cwd, 'api/**/*.js')).map(v => {
  const url = relative(cwd, v).replace('.js', '');
  const { method, middleware } = require(v);
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

  router[method](`/${url}`, middleware);
});

module.exports = app => {
  app.use(router.routes());

  app.use(router.allowedMethods());
};
