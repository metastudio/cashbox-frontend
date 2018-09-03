import * as React from 'react';

import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID, Status } from 'model-types';
import {
  ICustomer,
  loadCustomers,
  selectCustomers,
  selectCustomersStatus,
} from 'services/customers';
import { selectCurrentOrganizationId } from 'services/organizations';

import LoadingView from 'components/utils/loading-view';
import Table from './list/table';

interface IStateProps {
  orgId:     ID;
  status:    Status;
  customers: ICustomer[];
}

interface IDispatchProps {
  load: (orgId: ID) => void;
}

type IProps = IStateProps & IDispatchProps;

class CustomersList extends React.Component<IProps> {
  private loadData = () => {
    const { orgId, load } = this.props;
    load(orgId);
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate(oldProps: IProps) {
    if (this.props.status === Status.Invalid || this.props.orgId !== oldProps.orgId) {
      this.loadData();
    }
  }

  public render() {
    const { status, customers } = this.props;

    return (
      <>
        <PageHeader>
          <Link to="/customers/new" className="btn btn-default pull-right">Add Customer...</Link>
          Customers
        </PageHeader>
        <LoadingView status={ status }>
          { () => <Table customers={ customers } /> }
        </LoadingView>
      </>
    );
  }
}

const mapState = (state: {}): IStateProps => ({
  orgId:     selectCurrentOrganizationId(state),
  customers: selectCustomers(state),
  status:    selectCustomersStatus(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: (orgId: ID) => dispatch(loadCustomers(orgId)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(CustomersList);
