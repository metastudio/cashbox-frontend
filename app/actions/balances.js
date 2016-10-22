import { createAction } from 'redux-actions'

export const loadOrganizationBalances = createAction('LOAD_ORGANIZATION_BALANCES',         (organizationId) => ({ organizationId }))
loadOrganizationBalances.request = createAction('LOAD_ORGANIZATION_BALANCES_REQUEST', (organizationId) => ({ organizationId }))
loadOrganizationBalances.success = createAction('LOAD_ORGANIZATION_BALANCES_SUCCESS', (organizationId, balances) => ({ organizationId, balances }))
loadOrganizationBalances.failure = createAction('LOAD_ORGANIZATION_BALANCES_FAILURE')
