const axios = require('axios');
const { map } = require('lodash');

module.exports = async (ctx, next) => {
  const { user } = ctx.request.query;

  if (!user) {
    ctx.body = {
      code: 0,
      message: '',
      data: {
        user: '',
        list: []
      }
    };
    return;
  }

  const res = await axios.get(`https://registry.npmjs.org/-/_view/starredByUser?key="${user}"`);

  ctx.body = {
    code: 0,
    message: '',
    data: {
      user,
      list: map(res.data.rows, 'value')
    }
  };
};
