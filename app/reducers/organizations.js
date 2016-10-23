import { handleActions } from 'redux-actions'

import * as statuses from 'constants/statuses'

import {
  loadOrganizationsRequest, loadOrganizationsSuccess, loadOrganizationsFailure,
} from 'actions'

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
}

export default handleActions({
  [loadOrganizationsRequest]: (state) => ({
    ...state,
    items:  [],
    status: statuses.PENDING,
    error:  null,
  }),
  [loadOrganizationsSuccess]: (state, { payload }) => ({
    ...state,
    items:  payload.organizations,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadOrganizationsFailure]: (state, { payload }) => ({
    ...state,
    items:  [],
    status: statuses.FAILURE,
    error:  payload
  }),
}, defaultState)
