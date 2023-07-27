const less = require('less');

module.exports = {
  method: 'post',
  description: 'less 编译',
  args: {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        description: 'less 代码',
        examples: ['body {a: {color: red;}}}}']
      }
    },
    required: ['code'],
    additionalProperties: false,
    examples: [
      {
        code: 'body {a: {color: red;}}}}'
      }
    ]
  },
  middleware: async ctx => {
    const timestap = Date.now();

    const { code } = ctx.request.body;

    try {
      const { css } = await less.render(code);
      ctx.body = {
        code: 0,
        message: '',
        time: Date.now() - timestap,
        data: {
          css
        }
      };
    } catch (e) {
      ctx.body = {
        code: 1,
        message: e.message,
        time: Date.now() - timestap,
        data: {
          css: ''
        }
      };
    }
  }
};
