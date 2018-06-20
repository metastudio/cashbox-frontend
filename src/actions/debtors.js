import { createAction } from 'redux-actions';

export const loadDebtors = createAction('LOAD_DEBTORS', (organizationId) => ({ organizationId }));
loadDebtors.request = createAction('LOAD_DEBTORS_REQUEST', (organizationId) => ({ organizationId }));
loadDebtors.success = createAction('LOAD_DEBTORS_SUCCESS', (organizationId, debtors) => ({ organizationId, debtors }));
loadDebtors.failure = createAction('LOAD_DEBTORS_FAILURE');
