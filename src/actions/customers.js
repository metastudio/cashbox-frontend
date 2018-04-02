import { createAction } from 'redux-actions'
import { noop } from 'lodash'

export const loadCustomers = createAction('LOAD_CUSTOMERS', (organizationId) => ({ organizationId }))
loadCustomers.request = createAction('LOAD_CUSTOMERS_REQUEST', (organizationId) => ({ organizationId }))
loadCustomers.success = createAction('LOAD_CUSTOMERS_SUCCESS', (organizationId, customers) => ({ organizationId, customers }))
loadCustomers.failure = createAction('LOAD_CUSTOMERS_FAILURE')

export const createCustomer = createAction('CREATE_CUSTOMER', (organizationId, data) => ({ organizationId, data }), (_organizationId, _data, resolve = noop, reject = noop) => ({ resolve, reject }))
createCustomer.request = createAction('CREATE_CUSTOMER_REQUEST', (organizationId) => ({ organizationId }))
createCustomer.success = createAction('CREATE_CUSTOMER_SUCCESS', (organizationId, customer) => ({ organizationId, customer }))
createCustomer.failure = createAction('CREATE_CUSTOMER_FAILURE')

export const loadCustomer = createAction('LOAD_CUSTOMER', (organizationId, customerId) => ({ organizationId, customerId }))
loadCustomer.request = createAction('LOAD_CUSTOMER_REQUEST', (organizationId, customerId) => ({ organizationId, customerId }))
loadCustomer.success = createAction('LOAD_CUSTOMER_SUCCESS', (organizationId, customer) => ({ organizationId, customer }))
loadCustomer.failure = createAction('LOAD_CUSTOMER_FAILURE')

export const updateCustomer = createAction('UPDATE_CUSTOMER', (organizationId, customerId, data) => ({ organizationId, customerId, data }), (_organizationId, _data, resolve = noop, reject = noop) => ({ resolve, reject }))
updateCustomer.request = createAction('UPDATE_CUSTOMER_REQUEST', (organizationId, customerId) => ({ organizationId, customerId }))
updateCustomer.success = createAction('UPDATE_CUSTOMER_SUCCESS', (organizationId, customer) => ({ organizationId, customer }))
updateCustomer.failure = createAction('UPDATE_CUSTOMER_FAILURE')

export const deleteCustomer = createAction('DELETE_CUSTOMER', (organizationId, customerId) => ({ organizationId, customerId }), (_organizationId, _customerId, resolve = noop, reject = noop) => ({ resolve, reject }))
deleteCustomer.request = createAction('DELETE_CUSTOMER_REQUEST', (organizationId, customerId) => ({ organizationId, customerId }))
deleteCustomer.success = createAction('DELETE_CUSTOMER_SUCCESS', (organizationId, customer) => ({ organizationId, customer }))
deleteCustomer.failure = createAction('DELETE_CUSTOMER_FAILURE')

export const clearCustomer = createAction('CLEAR_CUSTOMER')
