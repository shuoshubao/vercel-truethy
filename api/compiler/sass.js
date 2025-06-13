import sass from 'sass';

export const compilerSass = {
    url: '/api/compiler/sass',
    method: 'post',
    middleware: async ctx => {
        const timestap = Date.now();

        const { code } = ctx.request.body;

        try {
            const { css } = sass.compileString(code);
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
