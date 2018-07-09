import { handleActions } from 'redux-actions'

import * as statuses from 'constants/statuses.js'
import { loadCategory, clearCategory } from './actions.js'

const defaultState = {
  data:   null,
  status: statuses.INVALID,
  error:  null,
}

export default handleActions({
  [loadCategory.request]: (state) => ({
    ...state,
    data:   null,
    status: statuses.PENDING,
    error:  null,
  }),
  [loadCategory.success]: (state, { payload }) => ({
    ...state,
    data:   payload.category,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadCategory.failure]: (state, { payload }) => ({
    ...state,
    data:   null,
    status: statuses.FAILURE,
    error:  payload
  }),
  [clearCategory]: (state) => ({
    ...state,
    data:   null,
    status: statuses.INVALID,
    error:  null
  }),
}, defaultState)
