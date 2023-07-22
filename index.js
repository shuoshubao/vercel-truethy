const Koa = require('koa');
const cors = require('@koa/cors');
const { bodyParser } = require('@koa/bodyparser');
const initRouter = require('./utils/router');

const app = new Koa();

app.use(cors());
app.use(bodyParser());
initRouter(app);

app.listen(3000);
