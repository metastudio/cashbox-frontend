import * as React from 'react';

import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
import Table from './list/table';

interface IStateProps {
  status:        Status;
  organizations: IOrganization[];
}

interface IDispatchProps {
  load: () => void;
}

type IProps = IStateProps & IDispatchProps;

class OrganizationsList extends React.Component<IProps> {
  private loadData = () => {
    const { load } = this.props;

    load();
  }

  public componentDidMount() {
    this.loadData();
  }

  public render() {
    const { status, organizations } = this.props;

    return (
      <>
        <PageHeader>
          <Link to="/organizations/new" className="btn btn-default pull-right">Add Organization...</Link>
          Organizations
        </PageHeader>
        <LoadingView status={ status }>
          { () => <Table organizations={ organizations } /> }
        </LoadingView>
      </>
    );
  }
}

const mapState = (state: IGlobalState) => ({
  status:        selectOrganizationsStatus(state),
  organizations: selectOrganizations(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  load: () => dispatch(loadOrganizations()),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(OrganizationsList);
