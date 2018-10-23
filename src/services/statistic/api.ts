import { ID } from 'model-types';

import { getApi, prepareURL } from 'utils/api-helpers';

const balanceStatisticURL = (orgId: ID) => prepareURL(`/api/organizations/${orgId}/statistic/balance`);

export const getBalanceStatistic = (orgId: ID) => getApi(balanceStatisticURL(orgId));
