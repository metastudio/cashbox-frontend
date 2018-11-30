import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ID, Status } from 'model-types';
import { IGlobalState } from 'services/global-state';
import {
  ICategoriesStatistic,
  loadExpenseCategoriesStatistic,
  selectExpenseCategoriesStatistic,
  selectExpenseCategoriesStatisticStatus,
  selectStatisticsQueryPeriod,
} from 'services/statistic';

import LoadingView from 'components/utils/loading-view';

interface IOwnProps {
  orgId:    ID;
  search:   string;
  children: (data: ICategoriesStatistic) => React.ReactNode;
}

interface IStateProps {
  status:     Status;
  statistic:  ICategoriesStatistic | null;
  period:     string | undefined;
}

interface IDispatchProps {
  load: typeof loadExpenseCategoriesStatistic.request;
}

type IProps = IOwnProps & IStateProps & IDispatchProps;

class ExpenseCategoriesStatisticProvider extends React.PureComponent<IProps> {
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
    const { orgId: prevOrgId, period: prevPeriod } = prevProps;
    const { status, orgId, period } = this.props;

    if (status === Status.Invalid || prevOrgId !== orgId || prevPeriod !== period) {
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
  status:     selectExpenseCategoriesStatisticStatus(state),
  statistic:  selectExpenseCategoriesStatistic(state),
  period:     selectStatisticsQueryPeriod(props.search),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => bindActionCreators(
  {
    load: loadExpenseCategoriesStatistic.request,
  },
  dispatch,
);

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  mapState, mapDispatch,
)(ExpenseCategoriesStatisticProvider);
