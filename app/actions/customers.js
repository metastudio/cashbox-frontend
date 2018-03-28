import { createAction } from 'redux-actions'

export const loadCustomers = createAction('LOAD_CUSTOMERS', (organizationId) => ({ organizationId }))
loadCustomers.request = createAction('LOAD_CUSTOMERS_REQUEST', (organizationId) => ({ organizationId }))
loadCustomers.success = createAction('LOAD_CUSTOMERS_SUCCESS', (organizationId, customers) => ({ organizationId, customers }))
loadCustomers.failure = createAction('LOAD_CUSTOMERS_FAILURE')
