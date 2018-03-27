import { createAction } from 'redux-actions'
import { noop } from 'lodash'

export const loadOrganizations = createAction('LOAD_ORGANIZATIONS')
loadOrganizations.request = createAction('LOAD_ORGANIZATIONS_REQUEST')
loadOrganizations.success = createAction('LOAD_ORGANIZATIONS_SUCCESS', (organizations) => ({ organizations }))
loadOrganizations.failure = createAction('LOAD_ORGANIZATIONS_FAILURE')

export const createOrganization = createAction('CREATE_ORGANIZATION',         (data) => ({ data }), (_, resolve = noop, reject = noop) => ({ resolve, reject }))
createOrganization.request = createAction('CREATE_ORGANIZATION_REQUEST')
createOrganization.success = createAction('CREATE_ORGANIZATION_SUCCESS', (organization) => ({ organization }))
createOrganization.failure = createAction('CREATE_ORGANIZATION_FAILURE')

export const setCurrentOrganization = createAction('SET_CURRENT_ORGANIZATION',         (organization) => ({ organization }), (_, resolve = noop, reject = noop) => ({ resolve, reject }))
setCurrentOrganization.success = createAction('SET_CURRENT_ORGANIZATION_SUCCESS', (organization) => ({ organization }))
