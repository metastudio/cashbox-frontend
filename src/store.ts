import { combineReducers, applyMiddleware, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import * as reducers from 'services/reducers.js';
import rootSaga from 'services/sagas.js';

function createAppStore() {

  const reducer = combineReducers({
    ...reducers,
    form: formReducer,
  });

  const sagaMiddleware = createSagaMiddleware();

  const createStoreWithMiddleware = applyMiddleware(
    sagaMiddleware,
    logger // TODO disable in prod
  )(createStore);

  const store = createStoreWithMiddleware(reducer);

  sagaMiddleware.run(rootSaga);

  return store;
}

const appStore = createAppStore();

export default appStore;
