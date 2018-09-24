import { createAction } from 'redux-actions';
import { noop } from 'lodash';

export const loadOrganizations = createAction('LOAD_ORGANIZATIONS');
loadOrganizations.request = createAction('LOAD_ORGANIZATIONS_REQUEST');
loadOrganizations.success = createAction('LOAD_ORGANIZATIONS_SUCCESS', (organizations) => ({ organizations }));
loadOrganizations.failure = createAction('LOAD_ORGANIZATIONS_FAILURE');

export const createOrganization = createAction(
  'CREATE_ORGANIZATION',
  (data) => ({ data }),
  (_, resolve = noop, reject = noop) => ({ resolve, reject }),
);
createOrganization.request = createAction('CREATE_ORGANIZATION_REQUEST');
createOrganization.success = createAction('CREATE_ORGANIZATION_SUCCESS', (organization) => ({ organization }));
createOrganization.failure = createAction('CREATE_ORGANIZATION_FAILURE');

export const setCurrentOrganization = createAction(
  'SET_CURRENT_ORGANIZATION',
  (organization) => ({ organization }),
  (_, resolve = noop, reject = noop) => ({ resolve, reject }),
);
setCurrentOrganization.success = createAction('SET_CURRENT_ORGANIZATION_SUCCESS', (organization) => ({ organization }));

export const restoreOrganization  = createAction('RESTORE_ORGANIZATION');
restoreOrganization.request = createAction('RESTORE_ORGANIZATION_REQUEST');
restoreOrganization.success = createAction('RESTORE_ORGANIZATION_SUCCESS', (organization) => ({ organization }));
restoreOrganization.failure = createAction('RESTORE_ORGANIZATION_FAILURE');

export const loadOrganization = createAction(
  'LOAD_ORGANIZATION',
  (organizationId) => ({ organizationId }),
);
loadOrganization.request = createAction(
  'LOAD_ORGANIZATION_REQUEST',
  (organizationId) => ({ organizationId }),
);
loadOrganization.success = createAction(
  'LOAD_ORGANIZATION_SUCCESS',
  (organizationId, organization) => ({ organizationId, organization }),
);
loadOrganization.failure = createAction('LOAD_ORGANIZATION_FAILURE');

export const updateOrganization = createAction(
  'UPDATE_ORGANIZATION',
  (organizationId, data) => ({ organizationId, data }),
  (_organizationId, _data, resolve = noop, reject = noop) => ({ resolve, reject }),
);
updateOrganization.request = createAction(
  'UPDATE_ORGANIZATION_REQUEST',
  (organizationId) => ({ organizationId }),
);
updateOrganization.success = createAction(
  'UPDATE_ORGANIZATION_SUCCESS',
  (organizationId, organization) => ({ organizationId, organization }),
);
updateOrganization.failure = createAction('UPDATE_ORGANIZATION_FAILURE');

export const destroyOrganization = createAction(
  'DESTROY_ORGANIZATION',
  (organizationId) => ({ organizationId }),
  (_organizationId, resolve = noop, reject = noop) => ({ resolve, reject }),
);
destroyOrganization.request = createAction(
  'DESTROY_ORGANIZATION_REQUEST',
  (organizationId) => ({ organizationId }),
);
destroyOrganization.success = createAction(
  'DESTROY_ORGANIZATION_SUCCESS',
  (organizationId, organization) => ({ organizationId, organization }),
);
destroyOrganization.failure = createAction('DESTROY_ORGANIZATION_FAILURE');
