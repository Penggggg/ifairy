"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var path = require("path");
var Mongoose = require("mongoose");
var KoaRouter = require("koa-router");
var KoaLog = require("koa-logs-full");
var KoaServer = require("koa-static2");
var KoaBodyParser = require("koa-bodyparser");
var controller_1 = require("./controller");
var app_config_1 = require("./config/app.config");
var app = new Koa();
var router = new KoaRouter();
var db = Mongoose.connect(app_config_1.AppConfig.dbIp + "/" + app_config_1.AppConfig.dbTarget);
;
controller_1.default(router);
db.connection.on('error', function (e) {
    console.error("\u6570\u636E\u5E93\u8FDE\u63A5\u9519\u8BEF: " + e);
});
db.connection.on('open', function () {
    console.log("mongodb\u8FDE\u63A5\u6210\u529F: " + app_config_1.AppConfig.dbTarget + "\u6570\u636E\u5E93");
});
app
    .use(KoaLog(app, {
    logdir: path.join(__dirname, 'logs')
}))
    .use(KoaServer("static", __dirname + '/dist'))
    .use(KoaBodyParser())
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(app_config_1.AppConfig.nodePort);
console.log("app is running in " + app_config_1.AppConfig.nodePort);
console.log("app's env is " + process.env.NODE_ENV);
