module.exports = {
  method: 'get',
  description: '获取环境变量',
  args: { type: 'null' },
  middleware: ctx => {
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
