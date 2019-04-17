import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Loadable from 'react-loadable';
import App from '../app';
import { Provider } from 'react-redux';
import createStore from '../store';
import rootSaga from '../src/redux/root_saga';
import isProduction from '../modules/utils/is_production';

const root = document.querySelector('#root');
const store = createStore({initState: window.__REDUX_STATE__ || {}});
store.runSaga(rootSaga);

const renderMethod = isProduction ? ReactDOM.hydrate : ReactDOM.render;

Loadable.preloadReady().then(() => {
  renderMethod(
    <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>,
    root);
});
