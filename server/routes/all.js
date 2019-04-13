import React from "react";
import ReactDOMServer from "react-dom/server";
import path from 'path';
import fs from 'fs';
import serialize from "serialize-javascript";
import {matchRoutes} from "react-router-config";
import {StaticRouter} from "react-router-dom";
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'
import stats from '../../dist/react-loadable.json';
import App from "../../app";
import routes from "../../src/routers/routes";
import {Provider} from "react-redux";
import createStore from "../../store";
import rootSaga from "../../src/redux/root_saga";

const loadRouteDependencies = (location, store) => {
  const currentRoute = matchRoutes(routes, location);
  const need = currentRoute.map(({route, match}) => {
    if (route.component) {
      return route.component &&
      route.component &&
      route.component.fetchData ?
        route.component.fetchData({
          store,
          params: match.params
        }) :
        Promise.resolve(null);
    }
    Promise.resolve(null);
  });

  return Promise.all(need);
};

const all = (req, res) => {

  const store = createStore();
  store.runSaga(rootSaga).toPromise().then(
    loadRouteDependencies(req.originalUrl, store))
    .then(() => {
      const context = {};
      const modules = [];
      const initState = store.getState();
      const app = ReactDOMServer.renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              <App/>
            </StaticRouter>
          </Provider>
        </Loadable.Capture>
      );

      const bundles = getBundles(stats, modules);

      const indexFile = path.resolve('./dist/index.html');
      fs.readFile(indexFile, 'utf8', (err, indexData) => {
        if (err) {
          console.error('Something went wrong:', err);
          return res.status(500).send('Oops, better luck next time!');
        }

        if (context.status === 404) {
          res.status(404);
        }
        if (context.url) {
          return res.redirect(301, context.url);
        }

        let stylesBundles = bundles.filter(bundle => bundle.file.endsWith('.css'));
        let scriptsBundles = bundles.filter(bundle => bundle.file.endsWith('.js'));

        let styles = '';
        (stylesBundles || []).map(style => {
          styles += `<link href="/${style.file}" rel="stylesheet" />`
        });

        let scripts = '';
        (scriptsBundles || []).map(script => {
          scripts += `<script charset="utf-8" src="/${script.file}"></script>`
        });

        let inlineScripts = '';
        if (initState) {
          inlineScripts += `<script type="text/javascript">window.__REDUX_STATE__ = ${serialize(initState)}</script>`;
        }

        return res.send(
          indexData
            .replace('</head>', `${styles}${scripts}</head>`)
            .replace('<div id="root"></div>', `<div id="root">${app}</div>${inlineScripts}`)
          // .replace('</body>', `${scripts}</body>`)
        );
      });

    })
    .catch((error) => {
      console.error(error);
    });
  store.close();
};

export default all;