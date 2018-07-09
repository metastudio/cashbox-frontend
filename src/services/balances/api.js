import { prepareURL, getApi } from 'utils/api-helpers';

const balancesURL = (orgId) => prepareURL(`/api/organizations/${orgId}/total_balances`);

export const getOrganizationBalances = (orgId) => getApi(balancesURL(orgId));
