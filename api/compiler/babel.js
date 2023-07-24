const babel = require('@babel/core');
require('@babel/preset-env');
require('@babel/preset-react');
const { merge, pick, cloneDeep } = require('lodash');

const defaultBabelConfig = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '200'
        }
      }
    ]
  ]
};

module.exports = {
  method: 'post',
  middleware: async (ctx, next) => {
    const timestap = Date.now();

    const { code, config = defaultBabelConfig } = ctx.request.body;

    try {
      const babelConfig = merge({}, defaultBabelConfig, config);

      const res = babel.transformSync(code, babelConfig);

      ctx.body = {
        code: 0,
        message: '',
        time: Date.now() - timestap,
        data: pick(res, 'code')
      };
    } catch (e) {
      ctx.body = {
        code: 1,
        message: e.message,
        time: Date.now() - timestap,
        data: null
      };
    }
  }
};
