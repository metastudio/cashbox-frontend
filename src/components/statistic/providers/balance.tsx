import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ID, IPagination, Status } from 'model-types';
import { IGlobalState } from 'services/global-state';
import {
  IBalanceStatistic,
  loadBalanceStatistic,
  selectBalanceStatistic,
  selectBalanceStatisticPagination,
  selectBalanceStatisticStatus,
} from 'services/statistic';
import { selectTransactionsQueryPage } from 'services/transactions';

import LoadingView from 'components/utils/loading-view';

interface IOwnProps {
  orgId:    ID;
  search:   string;
  children: (data: IBalanceStatistic, pagination: IPagination | null) => React.ReactNode;
}

interface IStateProps {
  status:     Status;
  statistic:  IBalanceStatistic | null;
  pagination: IPagination | null;
  page:       number | undefined;
}

interface IDispatchProps {
  load: typeof loadBalanceStatistic.request;
}

type IProps = IOwnProps & IStateProps & IDispatchProps;

class BalanceStatisticProvider extends React.PureComponent<IProps> {
  private loadData = () => {
    const { load, orgId, page } = this.props;

    load(orgId, { page });
  }

  private renderChildren = () => {
    const { statistic, pagination, children } = this.props;
    if (!statistic) { return null; }

    return children(statistic, pagination);
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate(prevProps: IProps) {
    const { orgId: prevOrgId, page: prevPage } = prevProps;
    const { status, orgId, page } = this.props;

    if (status === Status.Invalid || prevOrgId !== orgId || prevPage !== page) {
      this.loadData();
    }
  }

  public render() {
    const { status } = this.props;

    return(
      <LoadingView status={ status }>
        { this.renderChildren }
      </LoadingView>
    );
  }
}

const mapState = (state: IGlobalState, props: IOwnProps): IStateProps => ({
  status:     selectBalanceStatisticStatus(state),
  statistic:  selectBalanceStatistic(state),
  pagination: selectBalanceStatisticPagination(state),
  page:       selectTransactionsQueryPage(props.search),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => bindActionCreators(
  {
    load: loadBalanceStatistic.request,
  },
  dispatch,
);

// ({
//   load: (orgId, page) => dispatch(loadBalanceStatistic.request(orgId, page)),
// });

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  mapState, mapDispatch,
)(BalanceStatisticProvider);
