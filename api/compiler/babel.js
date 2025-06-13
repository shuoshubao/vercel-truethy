import babel from '@babel/core';
import '@babel/preset-env';
import '@babel/preset-react';
import { merge, pick } from 'lodash-es';

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

export const compilerBabel = {
    url: '/api/compiler/babel',
    method: 'post',
    middleware: async ctx => {
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
