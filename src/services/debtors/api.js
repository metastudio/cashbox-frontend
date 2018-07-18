import { prepareURL, getApi } from 'utils/api-helpers';

const debtorsURL = (orgId) => prepareURL(`/api/organizations/${orgId}/debtors`)

export const getDebtors = (orgId) => getApi(debtorsURL(orgId));
