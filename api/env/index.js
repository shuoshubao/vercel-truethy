module.exports = {
  method: 'get',
  middleware: async (ctx, next) => {
    const timestap = Date.now();

    ctx.body = {
      code: 0,
      message: '',
      time: Date.now() - timestap,
      data: {
        cwd: process.cwd(),
        env: process.env
      }
    };
  }
};
