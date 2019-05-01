import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Loadable from "react-loadable";
import App from "../app";
import { Provider } from "react-redux";
import createStore from "../store";
import rootSaga from "../code/redux/root_saga";
import isProduction from "../modules/utils/is_production";
import createUser from "../modules/user_authentication";

const root = document.querySelector("#root");

// get initial state from server and use it for creating redux store
const store = createStore({ initState: window.__REDUX_STATE__ || {} });

const user = createUser();

console.log(user);

// we need to start sagas outside the Redux middleware environment
// because of running necessary sagas for pre-fetching data for server side rendering on server app
store.runSaga(rootSaga);

// in development mode we are not using server side rendering
// because using ReactDom.hydrate generates a different DOM from what we produced in our SSR,
// thus react gives us a warning because of that.
const renderMethod = isProduction ? ReactDOM.hydrate : ReactDOM.render;

Loadable.preloadReady().then(() => {
  renderMethod(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    root
  );
});
