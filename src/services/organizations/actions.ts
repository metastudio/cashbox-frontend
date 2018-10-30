import { noop } from 'lodash';
import { createAction } from 'typesafe-actions';

import { ID } from 'model-types';
import { IOrganization, IOrganizationParams } from './types';

const setCurrentOrganization = {
  request: createAction(
    'SET_CURRENT_ORGANIZATION_REQUEST',
    (res) => {
      return (
        org:     IOrganization,
        resolve: ((org: IOrganization) => void) = noop,
        reject:  ((error: Error) => void)       = noop,
      ) => res(
        { org },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'SET_CURRENT_ORGANIZATION_SUCCESS',
    (resolve) => {
      return (org: IOrganization) => resolve({ org });
    },
  ),
};

const restoreOrganization = {
  request: createAction('RESTORE_ORGANIZATION_REQUEST'),
  success: createAction(
    'RESTORE_ORGANIZATION_SUCCESS',
    (resolve) => {
      return (org: IOrganization) => resolve({ org });
    },
  ),
  failure: createAction(
    'RESTORE_ORGANIZATION_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const loadOrganizations = {
  request: createAction('LOAD_ORGANIZATIONS_REQUEST'),
  success: createAction(
    'LOAD_ORGANIZATIONS_SUCCESS',
    (resolve) => {
      return (orgs: IOrganization[]) => resolve({ orgs });
    },
  ),
  failure: createAction(
    'LOAD_ORGANIZATIONS_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const createOrganization = {
  request: createAction(
    'CREATE_ORGANIZATION_REQUEST',
    (res) => {
      return (
        data:    IOrganizationParams,
        resolve: ((org: IOrganization) => void) = noop,
        reject:  ((error: Error) => void)       = noop,
      ) => res(
        { data },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'CREATE_ORGANIZATION_SUCCESS',
    (resolve) => {
      return (org: IOrganization) => resolve({ org });
    },
  ),
  failure: createAction(
    'CREATE_ORGANIZATION_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const loadOrganization = {
  request: createAction(
    'LOAD_ORGANIZATION_REQUEST',
    (resolve) => {
      return (orgId: ID) => resolve({ orgId });
    },
  ),
  success: createAction(
    'LOAD_ORGANIZATION_SUCCESS',
    (resolve) => {
      return (orgId: ID, org: IOrganization) => resolve({ orgId, org });
    },
  ),
  failure: createAction(
    'LOAD_ORGANIZATION_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const updateOrganization = {
  request: createAction(
    'UPDATE_ORGANIZATION_REQUEST',
    (res) => {
      return (
        orgId:   ID,
        data:    IOrganizationParams,
        resolve: ((org: IOrganization) => void) = noop,
        reject:  ((error: Error) => void)       = noop,
      ) => res(
        { orgId, data },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'UPDATE_ORGANIZATION_SUCCESS',
    (resolve) => {
      return (orgId: ID, org: IOrganization) => resolve({ orgId, org });
    },
  ),
  failure: createAction(
    'UPDATE_ORGANIZATION_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const destroyOrganization = {
  request: createAction(
    'DESTROY_ORGANIZATION_REQUEST',
    (res) => {
      return (
        orgId:   ID,
        resolve: ((org: IOrganization) => void) = noop,
        reject:  ((error: Error) => void)       = noop,
      ) => res(
        { orgId },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'DESTROY_ORGANIZATION_SUCCESS',
    (resolve) => {
      return (orgId: ID, org: IOrganization) => resolve({ orgId, org });
    },
  ),
  failure: createAction(
    'DESTROY_ORGANIZATION_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

export {
  setCurrentOrganization,
  restoreOrganization,

  loadOrganizations,
  loadOrganization,
  createOrganization,
  updateOrganization,
  destroyOrganization,
};
