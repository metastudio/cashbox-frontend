import { ID } from 'model-types';
import { getApi, prepareURL } from 'utils/api-helpers';

const debtorsURL = (orgId: ID) => prepareURL(`/api/organizations/${orgId}/debtors`);

export const getDebtors = (orgId: ID) => getApi(debtorsURL(orgId));
