import createSagaMiddleware, { END } from "redux-saga";
import {
  applyMiddleware,
  createStore as createReduxStore,
  compose
} from "redux";
import rootReducer from "../code/redux/root_reducers";
import isProduction from "../modules/utils/is_production";

const createStore = ({ initState = {} } = {}) => {
  const composeEnhancers =
    (!isProduction &&
      typeof window === "object" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const sagaMiddleware = createSagaMiddleware();
  const store = createReduxStore(
    rootReducer,
    initState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
};

export default createStore;
