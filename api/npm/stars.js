const axios = require('axios');
const { map } = require('lodash');

module.exports = {
  method: 'get',
  description: ' 获取用户收藏的npm包',
  args: {
    type: 'object',
    properties: {
      user: {
        type: 'string',
        description: '用户名',
        examples: ['shuoshubao']
      }
    },
    required: ['user'],
    examples: [
      {
        user: 'shuoshubao'
      }
    ]
  },
  middleware: async (ctx, next) => {
    const timestap = Date.now();

    const { user } = ctx.request.query;

    if (!user) {
      ctx.body = {
        code: 1,
        message: 'user is required',
        time: Date.now() - timestap,
        data: []
      };
      return;
    }

    const res = await axios.get(`https://registry.npmjs.org/-/_view/starredByUser?key="${user}"`);

    ctx.body = {
      code: 0,
      message: '',
      time: Date.now() - timestap,
      data: map(res.data.rows, 'value').sort()
    };
  }
};
