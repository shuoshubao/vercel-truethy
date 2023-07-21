const Koa = require('koa')
const Router = require('@koa/router')
const cors = require('@koa/cors')

const app = new Koa()
const router = new Router()

app.use(cors())

router.get('/', (ctx, next) => {
  ctx.body = '<h1>hello</h1>'
})

router.get('/api/demo', (ctx, next) => {
  ctx.body = {
    code: 0,
    message: '',
    data: 'demo'
  }
})

app.use(router.routes())

app.use(router.allowedMethods())

app.use(async ctx => {
  ctx.body = 'hello koa.js'
})

app.listen(3000)
