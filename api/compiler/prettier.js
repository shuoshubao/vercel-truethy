const prettier = require('prettier');
const { merge, pick, cloneDeep } = require('lodash');

const defaultPrettierConfig = {
  parser: 'babel',
  printWidth: 120,
  useTabs: false,
  tabWidth: 2,
  semi: true, // 不要分号
  singleQuote: true, // 单引号
  trailingComma: 'none', // 不要尾逗号
  proseWrap: 'never', // markdown 换行
  arrowParens: 'avoid',
  bracketSpacing: true, // { a }
  htmlWhitespaceSensitivity: 'ignore'
};

module.exports = {
  method: 'post',
  description: 'prettier 格式化',
  args: {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        description: '代码',
        examples: ['@my-ruleset: { .my-selector { @media tv { background-color: black; } } }; @media (orientation:portrait) { @my-ruleset(); }']
      },
      config: {
        type: 'object',
        description: 'pretier 配置',
        examples: [
          {
            parser: 'less'
          }
        ]
      }
    },
    required: ['code'],
    additionalProperties: false,
    examples: [
      {
        code: '@my-ruleset: { .my-selector { @media tv { background-color: black; } } }; @media (orientation:portrait) { @my-ruleset(); }',
        config: {
          parser: 'less'
        }
      }
    ]
  },
  middleware: async ctx => {
    const timestap = Date.now();

    const { code, config = defaultPrettierConfig } = ctx.request.body;

    try {
      const prettierConfig = merge({}, defaultPrettierConfig, config);

      const res = prettier.format(code, prettierConfig);

      ctx.body = {
        code: 0,
        message: '',
        time: Date.now() - timestap,
        data: {
          code: res,
          version: prettier.version
        }
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
