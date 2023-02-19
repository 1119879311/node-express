// 引入 express
const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const history = require("connect-history-api-fallback");
// 设置环境变量
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const res = dotenv.config({
  path: resolveApp(`config/${process.env.NODE_ENV || ""}.env`),
  override: true,
});
console.log("res",res.parsed)
// 创建时实例对象
const app = express();

app.use(/^\/public(\/.*)?$/, history());

app.use(express.static(resolveApp("public")));


// 设置模板引擎
app.engine("html", require("express-art-template"));
app.set("view options", {
  debug: process.env.NODE_ENV !== "production",
});
app.set("views", resolveApp("views"));
app.set("view engine", "html");

app.get(/^\/component(\/.*)?$/, (req, res, next) => {
  console.log("get", req.url);
  res.render("index.html", {
    baseRouter: "/component",
    title: "title111",
  });
});

// 监听端口,这里的端口自定义,随便写
app.listen(process.env.BY_PROT, (err) => {
  if (!err) console.log("服务开启成功!", process.env.BY_PROT);
});


