const Router = require('@koa/router');
const { generateDocument } = require('@nbfe/js2html');
const RouterConfig = require('./routerConfig.json');
const SsrData = require('./ssr.json');

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

router.get('/', async (ctx, next) => {
  const { html: ServerHtml, css: ServerCss } = SsrData;

  const { index: IndexJs } = require('../dist/manifest.json');

  const html = generateDocument({
    title: 'Vercel',
    style: ['https://unpkg.com/antd@5.7.1/dist/reset.css'],
    headScript: [
      {
        src: 'https://unpkg.com/react@18.2.0/umd/react.production.min.js'
      },
      {
        src: 'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js'
      },
      {
        src: 'https://unpkg.com/dayjs@1.11.9/dayjs.min.js'
      },
      {
        src: 'https://unpkg.com/antd@5.7.1/dist/antd.min.js'
      },
      {
        src: 'https://unpkg.com/lodash@4.17.21/lodash.min.js'
      },
      {
        text: `window.globalData = ${JSON.stringify({ RouterList })}`
      }
    ],
    script: [
      {
        src: IndexJs
      }
    ],
    link: [
      {
        href: 'https://assets.vercel.com/image/upload/front/favicon/vercel/32x32.png',
        rel: 'icon',
        type: 'image/png'
      }
    ],
    bodyHtml: [ServerCss, `<div id="app">${ServerHtml}</div>`]
  });

  ctx.body = html;
});

RouterList.forEach(v => {
  const { url, method, middleware } = v;

  router[method](url, middleware);
});

module.exports = app => {
  app.use(router.routes());

  app.use(router.allowedMethods());
};
