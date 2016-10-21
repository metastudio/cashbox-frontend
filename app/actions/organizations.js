import { createAction } from 'redux-actions'
import { noop } from 'lodash'

export const loadOrganizations        = createAction('LOAD_ORGANIZATIONS')
export const loadOrganizationsRequest = createAction('LOAD_ORGANIZATIONS_REQUEST')
export const loadOrganizationsSuccess = createAction('LOAD_ORGANIZATIONS_SUCCESS', (organizations) => ({ organizations }))
export const loadOrganizationsFailure = createAction('LOAD_ORGANIZATIONS_FAILURE')

export const createOrganization        = createAction('CREATE_ORGANIZATION',         (data) => ({ data }), (_, resolve = noop, reject = noop) => ({ resolve, reject }))
export const createOrganizationRequest = createAction('CREATE_ORGANIZATION_REQUEST')
export const createOrganizationSuccess = createAction('CREATE_ORGANIZATION_SUCCESS', (organization) => ({ organization }))
export const createOrganizationFailure = createAction('CREATE_ORGANIZATION_FAILURE')

export const loadOrganization        = createAction('LOAD_ORGANIZATION',         (organizationId) => ({ organizationId }))
export const loadOrganizationRequest = createAction('LOAD_ORGANIZATION_REQUEST', (organizationId) => ({ organizationId }))
export const loadOrganizationSuccess = createAction('LOAD_ORGANIZATION_SUCCESS', (organizationId, organization) => ({ organizationId, organization }))
export const loadOrganizationFailure = createAction('LOAD_ORGANIZATION_FAILURE')

export const setCurrentOrganization        = createAction('SET_CURRENT_ORGANIZATION',         (organization) => ({ organization }), (_, resolve = noop, reject = noop) => ({ resolve, reject }))
export const setCurrentOrganizationSuccess = createAction('SET_CURRENT_ORGANIZATION_SUCCESS', (organization) => ({ organization }))
