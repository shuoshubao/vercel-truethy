const axios = require('axios');
const { pick } = require('lodash');

const fetchPackage = async (name, keys = []) => {
  try {
    const { data } = await axios.get(`https://registry.npmjs.org/${name}`);
    if (keys.length === 0) {
      return data;
    }
    return pick(data, keys);
  } catch (e) {
    return null;
  }
};

module.exports = {
  method: 'post',
  description: '批量获取 npm 包信息',
  args: {
    type: 'object',
    properties: {
      packages: {
        type: 'string',
        description: '用户名',
        examples: ['shuoshubao']
      },
      keys: {
        type: 'array',
        description: '需要返回的字段',
        examples: [
          ['readme', 'users'],
          ['description', 'dist-tags.latest']
        ],
        items: {
          type: 'string'
        }
      }
    },
    required: ['packages'],
    additionalProperties: false
  },
  middleware: async ctx => {
    const timestap = Date.now();

    const { packages, keys } = ctx.request.body;

    if (!packages) {
      ctx.body = {
        code: 1,
        message: 'packages is required',
        time: Date.now() - timestap,
        data: []
      };
      return;
    }

    const list = await Promise.all(packages.map(v => fetchPackage(v, keys.filter(Boolean))));

    ctx.body = {
      code: 0,
      message: '',
      time: Date.now() - timestap,
      data: packages.reduce((prev, cur, index) => {
        prev[cur] = list[index];
        return prev;
      }, {})
    };
  }
};
