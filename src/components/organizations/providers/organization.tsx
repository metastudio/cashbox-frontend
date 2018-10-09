import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ID, Status } from 'model-types';
import { IGlobalState } from 'services/global-state';
import {
  IOrganization,
  loadOrganization,
  selectOrganization, selectOrganizationStatus,
} from 'services/organizations';

import LoadingView from 'components/utils/loading-view';

interface IOwnProps {
  orgId:    ID;
  children: (org: IOrganization) => React.ReactNode;
}

interface IStateProps {
  status: Status;
  org:    IOrganization | null;
}

interface IDispatchProps {
  load: typeof loadOrganization.request;
}

type IProps = IOwnProps & IStateProps & IDispatchProps;

class OrganizationProvider extends React.PureComponent<IProps> {
  private loadData = () => {
    const { status, orgId, org, load } = this.props;
    if (status === Status.Invalid || (org && org.id !== orgId)) {
      load(orgId);
    }
  }

  private renderChildren = () => {
    const { org, children } = this.props;
    if (!org) { return null; }

    return children(org);
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate() {
    this.loadData();
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
  status: selectOrganizationStatus(state),
  org:    selectOrganization(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: orgId => dispatch(loadOrganization.request(orgId)),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  mapState, mapDispatch,
)(OrganizationProvider);
