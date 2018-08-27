import * as React from 'react';

import { isEqual } from 'lodash';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ID, IPagination, Status } from 'model-types';
import { IGlobalState } from 'services/global-state';
import {
  ITransaction, ITransactionsFilter,
  loadTransactions,
  selectTransactions, selectTransactionsPagination, selectTransactionsQueryFilter,
  selectTransactionsQueryPage, selectTransactionsStatus,
} from 'services/transactions';

import LoadingView from 'components/utils/loading-view';

interface IOwnProps {
  orgId:    ID;
  search:   string;
  children: (
    transactions: ITransaction[],
    pagination:   IPagination | null,
  ) => React.ReactNode;
}

interface IStateProps {
  filter:       ITransactionsFilter;
  page:         number | undefined;
  status:       Status;
  transactions: ITransaction[];
  pagination:   IPagination | null;
}

interface IDispatchProps {
  load: (orgId: number, params: object) => void;
}

type IProps = IOwnProps & IStateProps & IDispatchProps;

class TransactionsProvider extends React.PureComponent<IProps> {
  private loadData = () => {
    const { orgId, load, filter, page } = this.props;
    load(orgId, { page, q: filter });
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate(prevProps: IProps) {
    const { filter: prevFilter, page: prevPage } = prevProps;
    const { status, filter: currFilter, page: currPage } = this.props;

    if (status === Status.Invalid || currPage !== prevPage || !isEqual(currFilter, prevFilter)) {
      this.loadData();
    }
  }

  public renderContent = () => {
    const { transactions, pagination, children } = this.props;

    return children(transactions, pagination);
  }

  public render() {
    return (
      <LoadingView status={ this.props.status }>
        { this.renderContent }
      </LoadingView>
    );
  }
}

const mapState = (state: IGlobalState, props: IOwnProps): IStateProps => ({
  filter:       selectTransactionsQueryFilter(props.search),
  page:         selectTransactionsQueryPage(props.search),
  status:       selectTransactionsStatus(state),
  transactions: selectTransactions(state),
  pagination:   selectTransactionsPagination(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: (orgId, params) => dispatch(loadTransactions(orgId, params)),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(TransactionsProvider);
