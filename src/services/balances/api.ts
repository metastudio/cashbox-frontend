import { ID } from 'model-types';
import { getApi, prepareURL } from 'utils/api-helpers';

const balancesURL = (orgId: ID) => prepareURL(`/api/organizations/${orgId}/total_balances`);

export const getOrganizationBalances = (orgId: ID) => getApi(balancesURL(orgId));
