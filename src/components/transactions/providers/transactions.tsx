import * as React from 'react';

import { isEqual, pick } from 'lodash';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ID, IPagination, Status } from 'model-types';
import { IGlobalState } from 'services/global-state';
import {
  ITransaction,
  loadTransactions,
  selectTransactions, selectTransactionsPagination, selectTransactionsStatus,
} from 'services/transactions';

import LoadingView from 'components/utils/loading-view';
import { parseQuery } from 'utils/url-helpers';

interface IOwnProps {
  orgId:    ID;
  search?:  string;
  children: (transactions: ITransaction[], pagination: IPagination | null) => React.ReactNode;
}

interface IStateProps {
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
    const { orgId, load, search } = this.props;
    load(orgId, pick(parseQuery(search), ['q', 'page']));
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate(prevProps: IProps) {
    const { search: prevSearch } = prevProps;
    const { status, search } = this.props;

    const prevQuery = parseQuery(prevSearch);
    const query     = parseQuery(search);

    if (status === Status.Invalid || !isEqual(query.q, prevQuery.q) || !isEqual(query.page, prevQuery.page)) {
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

const mapState = (state: IGlobalState): IStateProps => ({
  status:       selectTransactionsStatus(state),
  transactions: selectTransactions(state),
  pagination:   selectTransactionsPagination(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: (orgId, params) => dispatch(loadTransactions(orgId, params)),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(TransactionsProvider);
