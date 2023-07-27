const Router = require('@koa/router');
const { generateDocument } = require('@nbfe/js2html');
const prettier = require('prettier');
const getServerHtml = require('./ssr');
const RouterConfig = require('./routerConfig.json');

const router = new Router();

const RouterList = RouterConfig.map(v => {
  const url = `/${v}`;
  const { method, description, args, middleware } = require(`../${v}`);
  return {
    url,
    method,
    description,
    args,
    middleware
  };
});

router.get('/', async (ctx, next) => {
  const ServerHtml = getServerHtml({ RouterList });

  const { index: IndexJs } = require('../dist/manifest.json');

  const html = generateDocument({
    title: 'Vercel',
    style: ['https://unpkg.com/antd@4.24.12/dist/antd.min.css'],
    headScript: [
      {
        src: 'https://unpkg.com/react@18.2.0/umd/react.production.min.js'
      },
      {
        src: 'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js'
      },
      {
        src: 'https://unpkg.com/moment@2.25.3/min/moment.min.js'
      },
      {
        src: 'https://unpkg.com/antd@4.24.12/dist/antd.min.js'
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
    bodyHtml: [`<div id="app">${ServerHtml}</div>`]
  });

  ctx.body = prettier.format(html, {
    parser: 'html',
    printWidth: 160
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
