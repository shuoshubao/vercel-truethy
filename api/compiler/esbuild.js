const esbuild = require('esbuild');

module.exports = {
  method: 'post',
  description: 'esbuild 编译',
  args: {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        description: 'js 代码',
        examples: ['const App = () => {\nreturn <div>hello world</div>;\n};']
      },
      config: {
        type: 'object',
        description: 'esbuild 配置',
        examples: []
      }
    },
    required: ['code'],
    additionalProperties: false,
    examples: [
      {
        code: 'const App = () => {\nreturn <div>hello world</div>;\n};'
      }
    ]
  },
  middleware: async ctx => {
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
