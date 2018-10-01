import { ITransactionsSummaryState } from './types';

interface IState {
  transactionsSummary: ITransactionsSummaryState;
}

const selectTransactionsSummary       = (state: IState) => state.transactionsSummary.summary;
const selectTransactionsSummaryStatus = (state: IState) => state.transactionsSummary.status;

export {
  selectTransactionsSummary,
  selectTransactionsSummaryStatus,
};
