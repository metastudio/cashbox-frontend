import { prepareURL, getApi } from 'api/_helpers.js';

const balancesURL = (orgId) => prepareURL(`/api/organizations/${orgId}/total_balances`);

export const getOrganizationBalances = (orgId) => getApi(balancesURL(orgId));
