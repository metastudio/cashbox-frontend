import { prepareURL, getApi } from './_helpers';

const balancesURL = (orgId) => prepareURL(`/api/organizations/${orgId}/total_balances`);

export const getOrganizationBalances = (orgId) => getApi(balancesURL(orgId));
