const { outputJsonSync } = require('fs-extra');
const { resolve, relative } = require('path');
const glob = require('glob');

const cwd = process.cwd();

const Routerfiles = glob.sync(resolve(cwd, 'api/**/*.js')).map(v => {
  return relative(cwd, v).replace('.js', '');
});

outputJsonSync('dist/routerConfig.json', Routerfiles, { spaces: 2 });
