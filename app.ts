import * as Koa from 'koa';
import * as path from 'path';
import * as Mongoose from 'mongoose';
import * as KoaRouter from 'koa-router';
import * as KoaLog from 'koa-logs-full';
import * as KoaServer from "koa-static2";
import * as KoaBodyParser from 'koa-bodyparser';

import setRouter from './controller';
import { AppConfig } from './config/app.config';

const app = new Koa( );
const router = new KoaRouter( );
const db = Mongoose.connect(`${AppConfig.dbIp}/${AppConfig.dbTarget}`);;


setRouter( router )


db.connection.on('error',( e ) => {
    console.error(`数据库连接错误: ${e}`)
});
db.connection.on('open', ( ) => {
    console.log(`mongodb连接成功: ${AppConfig.dbTarget}数据库`)
});


app
  .use(KoaLog( app,{
      logdir: path.join( __dirname, 'logs')
  }))
  .use(KoaServer("static", __dirname + '/dist'))
  .use(KoaBodyParser( ))
  .use(router.routes( ))
  .use(router.allowedMethods( ));

app.listen( AppConfig.nodePort );
console.log(`app is running in ${AppConfig.nodePort}`);
console.log(`app's env is ${process.env.NODE_ENV}`)