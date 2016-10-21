import { handleActions } from 'redux-actions'

import {
  restoreSessionRequest, restoreSessionSuccess, restoreSessionFailure
} from 'actions'

const defaultState = {
  isSessionLoaded: false
}

export default handleActions({
  [restoreSessionRequest]: (state) => ({
    ...state,
    isSessionLoaded: false
  }),
  [restoreSessionSuccess]: (state) => ({
    ...state,
    isSessionLoaded: true
  }),
  [restoreSessionFailure]: (state) => ({
    ...state,
    isSessionLoaded: true
  }),
}, defaultState)
