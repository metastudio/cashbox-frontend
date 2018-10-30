import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Status } from 'model-types';
import { IGlobalState } from 'services/global-state';
import {
  IOrganization,
  loadOrganizations,
  selectOrganizations,
  selectOrganizationsStatus,
} from 'services/organizations';

import LoadingView from 'components/utils/loading-view';

interface IOwnProps {
  children: (organizations: IOrganization[]) => React.ReactNode;
}

interface IStateProps {
  status: Status;
  orgs:   IOrganization[];
}

interface IDispatchProps {
  load: typeof loadOrganizations.request;
}

type IProps = IOwnProps & IStateProps & IDispatchProps;

class OrganizationsProvider extends React.PureComponent<IProps> {
  private loadData = () => {
    if (this.props.status === Status.Invalid) {
      this.props.load();
    }
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate(prevProps: IProps) {
    this.loadData();
  }

  public renderContent = () => {
    const { orgs, children } = this.props;

    return children(orgs);
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
  status: selectOrganizationsStatus(state),
  orgs:   selectOrganizations(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: () => dispatch(loadOrganizations.request()),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(OrganizationsProvider);
