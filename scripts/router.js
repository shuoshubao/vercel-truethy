const { writeFileSync } = require('fs');
const { ensureFileSync } = require('fs-extra');
const { resolve, relative } = require('path');
const glob = require('glob');

const cwd = process.cwd();

const Routerfiles = glob.sync(resolve(cwd, 'api/**/*.js')).map(v => {
  return relative(cwd, v).replace('.js', '');
});

ensureFileSync('dist/routerConfig.json');

writeFileSync('dist/routerConfig.json', JSON.stringify(Routerfiles) + '\n');
