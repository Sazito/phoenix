import express from "express";
import proxy from "http-proxy-middleware";
import proxyList from "../../code/configs/proxy";

const app = express();

proxyList.map((record) => {
  const apiProxy = proxy(record.path, {
    target: record.target,
    changeOrigin: true,
    pathRewrite: { [`^${record.path}`]: "" }
  });

  app.use(record.path, apiProxy);
});

export default app;
