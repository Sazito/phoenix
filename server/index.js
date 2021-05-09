import express from "express";
import assets from "./routes/assets";
import customServerApp from "../code/server/app";
import all from "./routes/all";
import Loadable from "react-loadable";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import proxy from "./proxy";

// getting PORT from `.env` file in root directory
const PORT = process.env.PORT;
const BASEPATH = process.env.BASEPATH;
const ASSETS_PATH = process.env.ASSETS_PATH || "assets";
const app = express();

app.use(cookieParser());

const morganLogFormat = process.env.DEBUG_MODE ? "combined" : "tiny";

app.use(
  morgan(morganLogFormat, {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
    stream: process.stderr
  })
);

app.use(
  morgan(morganLogFormat, {
    skip: function (req, res) {
      return res.statusCode >= 400;
    },
    stream: process.stdout
  })
);

// adding a route for serving project static assets
app.use(express.static("./code/public"));

// handle boilerplate static assets
const assetsPath =
  BASEPATH !== "" ? `/${BASEPATH}/${ASSETS_PATH}` : `/${ASSETS_PATH}`;
app.use(assetsPath, assets);

// handle custom server routes
app.use(customServerApp);

// handle server proxy
app.use(proxy);

// handle other routes
app.get("/*", all);

Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
