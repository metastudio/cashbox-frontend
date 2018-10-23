import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ID, Status } from 'model-types';
import { IGlobalState } from 'services/global-state';
import {
  IBalanceStatistic,
  loadBalanceStatistic,
  selectBalanceStatistic, selectBalanceStatisticStatus,
} from 'services/statistic';

import LoadingView from 'components/utils/loading-view';

interface IOwnProps {
  orgId:    ID;
  children: (data: IBalanceStatistic) => React.ReactNode;
}

interface IStateProps {
  status:    Status;
  statistic: IBalanceStatistic | null;
}

interface IDispatchProps {
  load: typeof loadBalanceStatistic.request;
}

type IProps = IOwnProps & IStateProps & IDispatchProps;

class BalanceStatisticProvider extends React.PureComponent<IProps> {
  private loadData = () => {
    this.props.load(this.props.orgId);
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

const mapState = (state: IGlobalState): IStateProps => ({
  status:    selectBalanceStatisticStatus(state),
  statistic: selectBalanceStatistic(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: orgId => dispatch(loadBalanceStatistic.request(orgId)),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  mapState, mapDispatch,
)(BalanceStatisticProvider);
