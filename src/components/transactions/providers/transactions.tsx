import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as QS from 'query-string';

import { Status, IPagination, ID } from 'model-types';
import {
  ITransaction,
  loadTransactions,
  selectTransactions, selectTransactionsStatus, selectTransactionsPagination,
} from 'services/transactions';

import LoadingView from 'components/utils/loading-view';

interface IOwnProps {
  orgId:    ID;
  search?:  string;
  children: (transactions: ITransaction[], pagination?: IPagination) => React.ReactNode;
}

interface IStateProps {
  status:       Status;
  transactions: ITransaction[];
  pagination:   IPagination;
}

interface IDispatchProps {
  load: (orgId: number, params: object) => void;
}

type IProps = IOwnProps & IStateProps & IDispatchProps;

class TransactionsProvider extends React.PureComponent<IProps> {
  private loadData = () => {
    const { orgId, load, search } = this.props;
    load(orgId, QS.parse(search || ''));
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate(prevProps: IProps) {
    const { search: prevSearch } = prevProps;
    const { status, search } = this.props;

    if (status === Status.Invalid || search !== prevSearch) {
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

const mapState = (state: {}): IStateProps => ({
  status:       selectTransactionsStatus(state),
  transactions: selectTransactions(state),
  pagination:   selectTransactionsPagination(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: (orgId, params) => dispatch(loadTransactions(orgId, params)),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(TransactionsProvider);
