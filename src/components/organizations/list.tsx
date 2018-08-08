import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';

import { Status } from 'model-types';
import {
  IOrganization,
  selectOrganizations,
  selectOrganizationsStatus,
  loadOrganizations,
} from 'services/organizations';

import Table from './list/table';
import LoadingView from 'components/utils/loading-view';

interface IStateProps {
  status:        Status;
  organizations: IOrganization[] | null;
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

    if (status !== Status.Success || !organizations) {
      return <LoadingView status={ status } />;
    }

    return (
      <>
        <PageHeader>
          <Link to="/organizations/new" className="btn btn-default pull-right">Add Organization...</Link>
          Organizations
        </PageHeader>
        <Table organizations={ organizations } />
      </>
    );
  }
}

const mapState = (state: {}) => ({
  status:        selectOrganizationsStatus(state),
  organizations: selectOrganizations(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  load: () => dispatch(loadOrganizations()),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(OrganizationsList);
