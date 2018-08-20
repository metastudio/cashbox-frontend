import { handleActions } from 'redux-actions';

import { restoreSession } from 'services/auth';

const defaultState = {
  isSessionLoaded: false,
};

export default handleActions({
  [restoreSession.request]: (state) => ({
    ...state,
    isSessionLoaded: false,
  }),
  [restoreSession.success]: (state) => ({
    ...state,
    isSessionLoaded: true,
  }),
  [restoreSession.failure]: (state) => ({
    ...state,
    isSessionLoaded: true,
  }),
}, defaultState);
