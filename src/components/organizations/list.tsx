import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';

import { Status } from 'model-types';
import {
  Organization,
  selectOrganizations,
  selectOrganizationsStatus,
  loadOrganizations
} from 'services/organizations';

import Table from './list/table';
import LoadingView from 'components/utils/loading-view';

interface StateProps {
  status:        Status;
  organizations: Organization[] | null;
}

interface DispatchProps {
  load: () => void;
}

type Props = StateProps & DispatchProps;

class OrganizationsList extends React.Component<Props> {
  loadData = () => {
    const { load } = this.props;

    load();
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
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

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: () => dispatch(loadOrganizations()),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(OrganizationsList);
