import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ID, Status } from 'model-types';
import { IGlobalState } from 'services/global-state';
import {
  ICustomersByMonthsStatistic,
  loadIncomeCustomersByMonthsStatistic,
  selectIncomeCustomersByMonthsStatistic,
  selectIncomeCustomersByMonthsStatisticStatus,
  selectStatisticsQueryPeriod,
} from 'services/statistic';

import LoadingView from 'components/utils/loading-view';

interface IOwnProps {
  orgId:    ID;
  search:   string;
  children: (data: ICustomersByMonthsStatistic) => React.ReactNode;
}

interface IStateProps {
  status:    Status;
  statistic: ICustomersByMonthsStatistic | null;
  period:    string | undefined;
}

interface IDispatchProps {
  load: typeof loadIncomeCustomersByMonthsStatistic.request;
}

type IProps = IOwnProps & IStateProps & IDispatchProps;

class IncomeCustomersByMonthsStatisticProvider extends React.PureComponent<IProps> {
  private loadData = () => {
    const { load, orgId, period } = this.props;

    load(orgId, { period });
  }

  private renderChildren = () => {
    const { statistic, children } = this.props;
    if (!statistic) { return null; }

    return children(statistic);
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate(prevProps: IProps) {
    const { orgId: prevOrgId } = prevProps;
    const { status, orgId } = this.props;

    if (status === Status.Invalid || prevOrgId !== orgId) {
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
  status:    selectIncomeCustomersByMonthsStatisticStatus(state),
  statistic: selectIncomeCustomersByMonthsStatistic(state),
  period:    selectStatisticsQueryPeriod(props.search),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => bindActionCreators(
  {
    load: loadIncomeCustomersByMonthsStatistic.request,
  },
  dispatch,
);

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  mapState, mapDispatch,
)(IncomeCustomersByMonthsStatisticProvider);
