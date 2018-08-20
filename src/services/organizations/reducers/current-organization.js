import { handleActions, combineActions } from 'redux-actions';

import {
  setCurrentOrganization,
  restoreOrganization,
  clearCurrentOrganization,
} from '../actions.js';

const defaultState = {
  id:       null,
  data:     null,
  isLoaded: false,
};

export default handleActions({
  [restoreOrganization.request]: (state) => ({
    ...state,
    id:       null,
    data:     null,
    isLoaded: false,
  }),
  [combineActions(setCurrentOrganization.success, restoreOrganization.success)]: (state, { payload }) => ({
    ...state,
    id:       payload.organization && payload.organization.id,
    data:     payload.organization,
    isLoaded: true,
  }),
  [restoreOrganization.failure]: (state) => ({
    ...state,
    isLoaded: true,
  }),
  [clearCurrentOrganization]: (state) => ({
    ...state,
    id:       null,
    data:     null,
    isLoaded: false,
  }),
}, defaultState);
