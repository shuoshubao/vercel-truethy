const Router = require('@koa/router');
const { generateDocument } = require('@nbfe/js2html');
const prettier = require('prettier');
const { cloneDeep } = require('lodash');
const getServerHtml = require('./ssr');
const { publicPath: PUBLIC_PATH, index: IndexJs } = require('../dist/manifest.json');
const RouterFiles = require('../dist/routerConfig.json');

const router = new Router();

const renderArgs = args => {
  const { type, properties } = cloneDeep(args);
  if (type === 'object') {
    Object.entries(properties).forEach(([key, value]) => {
      delete properties[key].examples;
    });
    return properties;
  }
  return null;
};

const renderExample = record => {
  const { method, url, args } = record;
  const { type, examples } = args;
  let fetchCode = '';
  if (type === 'object') {
    const [example] = examples;
    if (method === 'get') {
      fetchCode = `fetch(\`${url}?\${new URLSearchParams(${JSON.stringify(example)})}\`)`;
    } else {
      fetchCode = `
        fetch('${url}', {
          method: '${method.toUpperCase()}',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(${JSON.stringify(example)})
        })
      `;
    }
  } else {
    if (method === 'get') {
      return `fetch('${url}')`;
    }
    return `fetch('${url}', {
        method: '${method.toUpperCase()}',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })`;
  }
  return prettier.format(fetchCode, {
    parser: 'babel',
    printWidth: 160,
    semi: false,
    singleQuote: true
  });
};

const RouterList = RouterFiles.map(v => {
  const url = `/${v}`;
  const item = require(`../${v}`);
  const { method, description, args, middleware } = item;
  return {
    url,
    method,
    description,
    args: renderArgs(args),
    example: renderExample({
      ...item,
      url
    }),
    middleware
  };
});

router.get('/', async (ctx, next) => {
  const ServerHtml = getServerHtml({ RouterList, PUBLIC_PATH });

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
        text: `window.globalData = ${JSON.stringify({ RouterList, PUBLIC_PATH })}`
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
