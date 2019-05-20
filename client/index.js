import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Loadable from "react-loadable";
import App from "../app";
import { Provider } from "react-redux";
import createStore from "../store";
import { createUser } from "../modules/membership";
import rootSaga from "../code/redux/root_saga";
import isProduction from "../modules/utils/is_production";
import { checkUser } from "../code/modules/membership";
import { env } from "../code/configs";
import { createAPI } from "../modules/api_wrapper";
import Cookies from "js-cookie";

const root = document.querySelector("#root");

// get initial state from server and use it for creating redux store
const store = createStore({ initState: window.__SERVER_STATES__ || {} });

const token = Cookies.get(env.APP_TOKEN);
createAPI({ token });

let theUser;
if (isProduction) {
  // in production we have SSR
  theUser = createUser({ initContext: window.__CONTEXT__ || null });
} else {
  theUser = createUser({
    token,
    checkUser
  });
}

// we need to start sagas outside the Redux middleware environment
// because of running necessary sagas for pre-fetching data for server side rendering on server app
store.runSaga(rootSaga);

// in development mode we are not using server side rendering
// because using ReactDom.hydrate generates a different DOM from what we produced in our SSR,
// thus react gives us a warning because of that.
const renderMethod = isProduction ? ReactDOM.hydrate : ReactDOM.render;
theUser.getUser().then(user => {
  Loadable.preloadReady().then(() => {
    renderMethod(
      <Provider store={store}>
        <BrowserRouter>
          <App user={user && user.data} userActions={theUser && theUser} />
        </BrowserRouter>
      </Provider>,
      root
    );
  });
});
