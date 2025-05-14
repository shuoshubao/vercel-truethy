const { glob } = require('glob');
const { pick } = require('lodash');

module.exports = {
  method: 'get',
  description: '获取环境变量',
  args: {
    type: 'null'
  },
  middleware: async ctx => {
    const timestap = Date.now();

    const files = await glob('*/**/*.{js,jsx,css,less,scss,sass,md}', {
      ignore: 'node_modules/**',
      nodir: true
    });

    const EnvKeys = Object.keys(process.env).filter(item => {
      return !item.includes('AWS');
    });

    ctx.body = {
      code: 0,
      message: '',
      time: Date.now() - timestap,
      data: {
        cwd: process.cwd(),
        env: pick(process.env, EnvKeys),
        files: files.sort()
      }
    };
  }
};
