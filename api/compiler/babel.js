const babel = require('@babel/core');
const { merge, pick, cloneDeep } = require('lodash');

const defaultBabelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '200'
        }
      }
    ],
    '@babel/preset-react'
  ]
};

module.exports = {
  method: 'post',
  middleware: async (ctx, next) => {
    const timestap = Date.now();

    const { code, config } = ctx.request.body;

    try {
      const babelConfig = cloneDeep(defaultBabelConfig);
      if (config) {
        const babelConfig = merge({}, defaultBabelConfig, JSON.parse(config));
      }

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
