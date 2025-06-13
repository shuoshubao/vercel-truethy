import less from 'less';

export const compilerLess = {
    url: '/api/compiler/less',
    method: 'post',
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
