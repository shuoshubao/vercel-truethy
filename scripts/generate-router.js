const { writeFileSync } = require('fs');
const { resolve, relative } = require('path');
const glob = require('glob');
const getServerHtml = require('../utils/ssr');

const cwd = process.cwd();

const Routerfiles = glob.sync(resolve(cwd, 'api/**/*.js')).map(v => {
  return relative(cwd, v).replace('.js', '');
});

writeFileSync('utils/routerConfig.json', JSON.stringify(Routerfiles) + '\n');

const RouterList = Routerfiles.map(v => {
  const url = `/${v}`;
  const { method, middleware } = require(`../${v}`);
  return {
    url,
    method,
    middleware
  };
});

const { html, css } = getServerHtml({ RouterList });

writeFileSync('utils/ssr.json', JSON.stringify({ html, css }) + '\n');
