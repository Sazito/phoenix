import React from "react";
import ReactDOMServer from "react-dom/server";
import path from "path";
import fs from "fs";
import serialize from "serialize-javascript";
import { matchRoutes } from "react-router-config";
import { StaticRouter } from "react-router-dom";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable-ssr-addon";
import stats from "../../dist/react-loadable.json";
import App from "../../app";
import index from "../../code/routes";
import { Provider } from "react-redux";
import createStore from "../../store";
import { env } from "../../code/configs";
import rootSaga from "../../code/redux/root_saga";
import { createUser } from "../../modules/membership";
import { createAPI } from "../../modules/api_wrapper";
import { checkUser } from "../../code/modules/membership";
import CryptoJS from "crypto-js";
import { Helmet } from "react-helmet";
import { createLocale } from "../../modules/localization";
import { calculateLocale } from "../../modules/localization/check_locale";
import { REGEXP_LINK_HREF_DIR } from "../../modules/localization/consts.js";
import { minify } from "html-minifier";

const loadRouteDependencies = (location, store) => {
  // get current components by matching current location against project's routes list
  const currentRoute = matchRoutes(index, location);
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
  const token = req.cookies[env.APP_TOKEN];

  createAPI({ token });

  // create store without any initial state
  const store = createStore();
  const theUser = createUser({
    token,
    checkUser
  });

  const localeCode = calculateLocale(req);

  const locale = createLocale({ localeCode });
  const dir = locale.getDirection();
  const lang = locale.getLanguage();

  theUser.getUser().then((user) => {
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
        const modules = new Set();

        // computing initial state after running sagas and passing it to client via `window`
        const initState = store.getState();

        const app = ReactDOMServer.renderToString(
          <Loadable.Capture report={(moduleName) => modules.add(moduleName)}>
            <Provider store={store}>
              <StaticRouter location={req.url} context={context}>
                <App
                  user={user && user.status === 200 && user.data}
                  userContext={theUser && theUser}
                  locale={locale}
                />
              </StaticRouter>
            </Provider>
          </Loadable.Capture>
        );

        // get all bundles that are necessary for the current route
        // `stats` is the asset-manifest of application that contains list of all bundles and chunks
        // `modules` is list of current route's modules that detected by react loadable
        const modulesToBeLoaded = [...Array.from(modules)];

        const bundles = getBundles(stats, modulesToBeLoaded);

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

          let styles = "";
          (bundles.css || []).map((style) => {
            const href = style.publicPath.replace(
              REGEXP_LINK_HREF_DIR,
              `-${dir}`
            );
            styles += `<link href="${href}" rel="stylesheet" />`;
          });

          let scripts = "";
          (bundles.js || []).map((script) => {
            scripts += `<script src="${script.publicPath}"></script>`;
          });

          let inlineScripts = "";
          if (initState) {
            inlineScripts += `<script type="text/javascript">window.__SERVER_STATES__ = ${serialize(
              initState
            )}</script>`;
          }

          if (token && user && user.data) {
            // Encrypt
            const userHash = CryptoJS.AES.encrypt(
              JSON.stringify({ user: user.data }),
              token
            ).toString();

            inlineScripts += `<script type="text/javascript">window.__CONTEXT__ = ${serialize(
              userHash
            )}</script>`;
          }
          const helmet = Helmet.renderStatic();
          const helmetData =
            helmet.title.toString() +
            helmet.meta.toString() +
            helmet.link.toString() +
            helmet.script.toString();

          let transformedIndexData = indexData.replace(
            REGEXP_LINK_HREF_DIR,
            `-${dir}`
          );

          transformedIndexData = transformedIndexData
            .replace("<html>", `<html lang="${lang}" dir="${dir}">`)
            .replace("</head>", `${styles}${scripts}</head>`)
            .replace("<title></title>", `${helmetData}`)
            .replace(
              '<div id="root"></div>',
              `<div id="root">${app}</div>${inlineScripts}`
            );

          transformedIndexData = minify(transformedIndexData, {
            removeStyleLinkTypeAttributes: true,
            removeScriptTypeAttributes: true,
            processConditionalComments: true,
            collapseBooleanAttributes: true,
            removeRedundantAttributes: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            removeTagWhitespace: true,
            removeOptionalTags: true,
            collapseWhitespace: true,
            decodeEntities: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true
          });

          // sending prepared data, chunks and redux initial states to the client
          return res.send(transformedIndexData);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    store.close();
  });
};

export default all;
