const { resolve, relative } = require('path');
const os = require('os');
const glob = require('glob');
const Router = require('@koa/router');
const { generateDocument } = require('@nbfe/js2html');
const prettier = require('prettier');
const { cloneDeep } = require('lodash');
const getServerHtml = require('./ssr');

const cwd = process.cwd();

const isMac = os.platform() === 'darwin';

const PUBLIC_PATH = isMac ? '/' : `https://${process.env.VERCEL_URL}/`;

const RouterFiles = glob.sync(resolve(cwd, 'api/**/*.js')).map(v => {
  return relative(cwd, v).replace('.js', '');
});

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

const getAliNpmCdnUrl = ({ name, version, path }) => {
  return ['https://registry.npmmirror.com', name, version, 'files', path].join('/');
};

router.get('/', async (ctx, next) => {
  const ServerHtml = getServerHtml({ RouterList, PUBLIC_PATH });

  const html = generateDocument({
    title: 'Vercel',
    style: [
      getAliNpmCdnUrl({
        name: 'antd',
        version: '4.24.12',
        path: 'dist/antd.min.css'
      })
    ],
    headScript: [
      {
        src: getAliNpmCdnUrl({
          name: 'react',
          version: '18.2.0',
          path: `umd/${isMac ? 'react.development.js' : 'react.production.min.js'}`
        })
      },
      {
        src: getAliNpmCdnUrl({
          name: 'react-dom',
          version: '18.2.0',
          path: `umd/${isMac ? 'react-dom.development.js' : 'react-dom.production.min.js'}`
        })
      },
      {
        src: getAliNpmCdnUrl({
          name: 'moment',
          version: '2.25.3',
          path: 'min/moment.min.js'
        })
      },
      {
        src: getAliNpmCdnUrl({
          name: 'antd',
          version: '4.24.12',
          path: 'dist/antd.min.js'
        })
      },
      {
        src: getAliNpmCdnUrl({
          name: 'lodash',
          version: '4.17.21',
          path: 'lodash.min.js'
        })
      },
      {
        text: `window.globalData = ${JSON.stringify({ RouterList, PUBLIC_PATH })}`
      }
    ],
    script: [
      {
        src: `${PUBLIC_PATH}index.js`
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
