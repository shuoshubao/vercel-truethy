const Koa = require('koa');
const cors = require('@koa/cors');
const koaStatic = require('koa-static');
const { bodyParser } = require('@koa/bodyparser');
const initRouter = require('./utils/router');

const app = new Koa();

app.use(cors());
app.use(koaStatic('dist'));
app.use(bodyParser());
initRouter(app);

module.exports = app.callback();
