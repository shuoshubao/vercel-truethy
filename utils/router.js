const Router = require('@koa/router');
const { generateDocument } = require('@nbfe/js2html');
const RouterConfig = require('./routerConfig.json');

const router = new Router();

const RouterList = RouterConfig.map(v => {
  const url = `/${v}`;
  const { method, middleware } = require(`../${v}`);
  return {
    url,
    method,
    middleware
  };
});

const RouterListHtml = RouterList.map(v => {
  const { url, method } = v;
  return `<div><span class="ant-tag ant-tag-green">${method}</span> ${url}</div>`;
}).join('');

router.get('/', (ctx, next) => {
  ctx.body = generateDocument({
    title: 'Vercel',
    style: ['https://unpkg.com/antd@4.24.12/dist/antd.min.css'],
    bodyHtml: `<div class="ant-card ant-card-bordered">
      <div class="ant-card-head">
        <div class="ant-card-head-wrapper">
          <div class="ant-card-head-title">API</div>
        </div>
      </div>
      <div class="ant-card-body">
        ${RouterListHtml}
      </div>
    </div>
    `
    // bodyHtml: `<ul>${RouterListHtml}</ul>`
  });
});

RouterList.forEach(v => {
  const { url, method, middleware } = v;

  router[method](url, middleware);
});

module.exports = app => {
  app.use(router.routes());

  app.use(router.allowedMethods());
};
