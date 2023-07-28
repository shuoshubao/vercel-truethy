const { glob } = require('glob');

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

    ctx.body = {
      code: 0,
      message: '',
      time: Date.now() - timestap,
      data: {
        cwd: process.cwd(),
        env: process.env,
        files: files.sort()
      }
    };
  }
};
