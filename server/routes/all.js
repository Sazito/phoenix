import React from "react";
import ReactDOMServer from "react-dom/server";
import path from "path";
import fs from "fs";
import serialize from "serialize-javascript";
import { matchRoutes } from "react-router-config";
import { StaticRouter } from "react-router-dom";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import stats from "../../dist/react-loadable.json";
import App from "../../app";
import routes from "../../code/routers/routes";
import { Provider } from "react-redux";
import createStore from "../../store";
import rootSaga from "../../code/redux/root_saga";

const loadRouteDependencies = (location, store) => {
  // get current components by matching current location against project's routes list
  const currentRoute = matchRoutes(routes, location);
  const need = currentRoute.map(({ route, match }) => {
    // check if the component exists and have the `pre-fetch` method
    if (route.component) {
      return route.component && route.component && route.component.fetchData
        ? route.component.fetchData({
            // pass store and location parameters data to `pre-fetch` method
            store,
            params: match.params
          })
        : Promise.resolve(null);
    }
    Promise.resolve(null);
  });

  return Promise.all(need);
};

const all = (req, res) => {

  // create store without any initial state
  const store = createStore();

  // we need to start sagas outside the Redux middleware environment
  // because of running necessary sagas for pre-fetching data for server side rendering on server app
  store
    .runSaga(rootSaga)
    .toPromise()
    .then(
      // running pre-fetches
      loadRouteDependencies(req.originalUrl, store)
    )
    .then(() => {
      const context = {};
      const modules = [];

      // computing initial state after running sagas and passing it to client via `window`
      const initState = store.getState();

      const app = ReactDOMServer.renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              <App />
            </StaticRouter>
          </Provider>
        </Loadable.Capture>
      );

      // get all bundles that are necessary for the current route
      // `stats` is the asset-manifest of application that contains list of all bundles and chunks
      // `modules` is list of current route's modules that detected by react loadable
      const bundles = getBundles(stats, modules);

      const indexFile = path.resolve("./dist/index.html");
      fs.readFile(indexFile, "utf8", (err, indexData) => {
        if (err) {
          console.error("Something went wrong:", err);
          return res.status(500).send("Oops, better luck next time!");
        }

        if (context.status === 404) {
          res.status(404);
        }
        if (context.url) {
          return res.redirect(301, context.url);
        }

        // separating css and js chunks
        let stylesBundles = bundles.filter(bundle =>
          bundle.file.endsWith(".css")
        );
        let scriptsBundles = bundles.filter(bundle =>
          bundle.file.endsWith(".js")
        );

        let styles = "";
        (stylesBundles || []).map(style => {
          styles += `<link href="/${style.file}" rel="stylesheet" />`;
        });

        let scripts = "";
        (scriptsBundles || []).map(script => {
          scripts += `<script charset="utf-8" src="/${script.file}"></script>`;
        });

        let inlineScripts = "";
        if (initState) {
          inlineScripts += `<script type="text/javascript">window.__REDUX_STATE__ = ${serialize(
            initState
          )}</script>`;
        }

        // sending prepared data, chunks and redux initial states to the client
        return res.send(
          indexData
            .replace("</head>", `${styles}${scripts}</head>`)
            .replace(
              '<div id="root"></div>',
              `<div id="root">${app}</div>${inlineScripts}`
            )
        );
      });
    })
    .catch(error => {
      console.error(error);
    });
  store.close();
};

export default all;
