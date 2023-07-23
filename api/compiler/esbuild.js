const esbuild = require('esbuild');

module.exports = {
  method: 'post',
  middleware: async (ctx, next) => {
    const timestap = Date.now();

    const { code } = ctx.request.body;

    const res = await esbuild.transform(code, {
      loader: 'jsx'
    });

    ctx.body = {
      code: 0,
      message: '',
      time: Date.now() - timestap,
      data: res
    };
  }
};
