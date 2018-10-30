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
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';

import LoadingView from 'components/utils/loading-view';
import Table from './list/table';

interface IStateProps {
  orgId:     ID;
  status:    Status;
  customers: ICustomer[];
}

interface IDispatchProps {
  load: typeof loadCustomers.request;
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

const mapState = (state: IGlobalState): IStateProps => ({
  orgId:     selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
  customers: selectCustomers(state),
  status:    selectCustomersStatus(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: orgId => dispatch(loadCustomers.request(orgId)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(CustomersList);
