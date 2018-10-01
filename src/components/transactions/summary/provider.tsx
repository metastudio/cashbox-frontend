import * as React from 'react';

import { isEqual } from 'lodash';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ID, Status } from 'model-types';
import { IGlobalState } from 'services/global-state';
import {
  ITransactionsFilter,
  selectTransactionsQueryFilter,
} from 'services/transactions';
import {
  ITransactionsSummary,
  loadTransactionsSummary,
  selectTransactionsSummary,
  selectTransactionsSummaryStatus,
} from 'services/transactions-summary';

import LoadingView from 'components/utils/loading-view';

interface IOwnProps {
  orgId:    ID;
  search:   string;
  children: (summary: ITransactionsSummary) => React.ReactNode;
}

interface IStateProps {
  filter:  ITransactionsFilter;
  status:  Status;
  summary: ITransactionsSummary | null;
}

interface IDispatchProps {
  load: (orgId: number, query: object) => void;
}

type IProps = IOwnProps & IStateProps & IDispatchProps;

class TransactionsSummaryProvider extends React.PureComponent<IProps> {
  private loadData = () => {
    const { orgId, load, filter } = this.props;
    load(orgId, { q: filter });
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate(prevProps: IProps) {
    const { filter: prevFilter } = prevProps;
    const { status, filter: currFilter } = this.props;

    if (status === Status.Invalid || !isEqual(currFilter, prevFilter)) {
      this.loadData();
    }
  }

  public renderContent = () => {
    const { summary, children } = this.props;
    if (!summary) { return null; }

    return children(summary);
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
  filter:  selectTransactionsQueryFilter(props.search),
  status:  selectTransactionsSummaryStatus(state),
  summary: selectTransactionsSummary(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: (orgId, params) => dispatch(loadTransactionsSummary.request(orgId, params)),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(TransactionsSummaryProvider);
