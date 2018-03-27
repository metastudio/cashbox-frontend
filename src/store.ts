import { combineReducers, applyMiddleware, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import * as reducers from 'reducers';
import rootSaga from 'sagas';

function createAppStore() {

  const reducer = combineReducers({
    ...reducers,
    form: formReducer,
  });

  const logger = createLogger();
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
