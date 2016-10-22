import { createAction } from 'redux-actions'

export const loadBankAccounts = createAction('LOAD_BANK_ACCOUNTS', (organizationId) => ({ organizationId }))
loadBankAccounts.request = createAction('LOAD_BANK_ACCOUNTS_REQUEST', (organizationId) => ({ organizationId }))
loadBankAccounts.success = createAction('LOAD_BANK_ACCOUNTS_SUCCESS', (organizationId, bankAccounts) => ({ organizationId, bankAccounts }))
loadBankAccounts.failure = createAction('LOAD_BANK_ACCOUNTS_FAILURE')
