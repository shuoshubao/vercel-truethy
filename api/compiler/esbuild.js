const esbuild = require('esbuild');

module.exports = {
  method: 'post',
  middleware: async (ctx, next) => {
    const timestap = Date.now();

    const { code } = ctx.request.body;

    const res = esbuild.transformSync(code);

    ctx.body = {
      code: 0,
      message: '',
      time: Date.now() - timestap,
      data: res
    };
  }
};
