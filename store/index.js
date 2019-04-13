import createSagaMiddleware, { END } from 'redux-saga';
import {applyMiddleware, createStore as createReduxStore} from 'redux';
import rootReducer from '../src/redux/root_reducers';

const createStore = ({initState = {}} = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createReduxStore(
    rootReducer,
    initState,
    applyMiddleware(sagaMiddleware),
  );
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
};

export default createStore;
