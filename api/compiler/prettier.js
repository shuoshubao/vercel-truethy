import { merge } from 'lodash-es';
import prettier from 'prettier';

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

export const compilerPrettier = {
    url: '/api/compiler/prettier',
    method: 'post',
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
