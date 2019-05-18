import express from "express";
import assets from "./routes/assets";
import all from "./routes/all";
import Loadable from "react-loadable";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// handle app custom route
import customRoutes from "../code/server_routes";

import proxy from "./proxy";

// getting PORT from `.env` file in root directory
const PORT = process.env.PORT;
const app = express();

app.use(cookieParser());

app.use(
  morgan("tiny", {
    skip: function(req, res) {
      return res.statusCode < 400;
    },
    stream: process.stderr
  })
);

app.use(
  morgan("tiny", {
    skip: function(req, res) {
      return res.statusCode >= 400;
    },
    stream: process.stdout
  })
);

// adding a route for serving project static assets
app.use(express.static("./code/public"));

// handle boilerplate static assets
app.use("/assets", assets);

app.use(customRoutes);
app.use(proxy);

// handle other routes
app.get("/*", all);

Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
