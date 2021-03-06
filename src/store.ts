import { applyMiddleware, combineReducers, createStore, Middleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import * as reducers from 'services/reducers';
import formReducers from 'services/redux-form/reducers';
import rootSaga from 'services/sagas';

function createAppStore() {

  const reducer = combineReducers({
    ...reducers,
    form: formReducer.plugin(formReducers),
  });

  const sagaMiddleware = createSagaMiddleware();

  const middlewares: Middleware[] = [
    sagaMiddleware,
  ];
  if (process.env.REACT_APP_ENABLE_REDUX_LOGGER === 'true') {
    const logger = createLogger({ collapsed: true });
    middlewares.push(logger);
  }

  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

  const store = createStoreWithMiddleware(reducer);

  sagaMiddleware.run(rootSaga);

  return store;
}

const appStore = createAppStore();

export default appStore;
