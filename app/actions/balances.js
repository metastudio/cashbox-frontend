import { createAction } from 'redux-actions'

export const loadOrganizationBalances        = createAction('LOAD_ORGANIZATION_BALANCES',         (organizationId) => ({ organizationId }))
export const loadOrganizationBalancesRequest = createAction('LOAD_ORGANIZATION_BALANCES_REQUEST', (organizationId) => ({ organizationId }))
export const loadOrganizationBalancesSuccess = createAction('LOAD_ORGANIZATION_BALANCES_SUCCESS', (organizationId, balances) => ({ organizationId, balances }))
export const loadOrganizationBalancesFailure = createAction('LOAD_ORGANIZATION_BALANCES_FAILURE')
