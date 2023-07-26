const glob = require('glob');

module.exports = {
  method: 'get',
  middleware: (ctx, next) => {
    const timestap = Date.now();

    ctx.body = {
      code: 0,
      message: '',
      time: Date.now() - timestap,
      data: {
        cwd: process.cwd(),
        env: process.env,
        filse: Array.from(new Set([glob.sync('*'), glob.sync('*/*.*'), glob.sync('*/*')].flat())).sort()
      }
    };
  }
};
