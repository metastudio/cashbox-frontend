import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ID, Status } from 'model-types';
import { IGlobalState } from 'services/global-state';
import {
  ICustomersByMonthsStatistic,
  loadExpenseCustomersByMonthsStatistic,
  selectExpenseCustomersByMonthsStatistic,
  selectExpenseCustomersByMonthsStatisticStatus,
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
  load: typeof loadExpenseCustomersByMonthsStatistic.request;
}

type IProps = IOwnProps & IStateProps & IDispatchProps;

class ExpenseCustomersByMonthsStatisticProvider extends React.PureComponent<IProps> {
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
  status:    selectExpenseCustomersByMonthsStatisticStatus(state),
  statistic: selectExpenseCustomersByMonthsStatistic(state),
  period:    selectStatisticsQueryPeriod(props.search),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => bindActionCreators(
  {
    load: loadExpenseCustomersByMonthsStatistic.request,
  },
  dispatch,
);

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  mapState, mapDispatch,
)(ExpenseCustomersByMonthsStatisticProvider);
