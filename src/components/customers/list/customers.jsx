import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js';
import { loadCustomers, selectCustomers, selectCustomersStatus } from 'services/customers';
import { selectCurrentOrganizationId } from 'services/organizations';

import LoadingView from 'components/utils/loading-view';
import TableBody from './table-body.jsx';

class Customers extends React.Component {
  componentDidMount() {
    const { orgId, loadCustomers } = this.props;
    loadCustomers(orgId);
  }

  render() {
    const { status, customers } = this.props;

    if (status !== statuses.SUCCESS || !customers) {
      return <LoadingView status={ status } />;
    }

    return (
      <Table striped responsive hover id="customers">
        <thead>
          <tr>
            <th>Name</th>
            <th>Invoice Details</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <TableBody customers={ customers } />
      </Table>
    );
  }
}

Customers.propTypes = {
  orgId:         PropTypes.number.isRequired,
  loadCustomers: PropTypes.func.isRequired,
  status:        PropTypes.string.isRequired,
  customers:     PropTypes.arrayOf(PropTypes.object).isRequired,
};

const select = (state) => ({
  orgId:     selectCurrentOrganizationId(state),
  customers: selectCustomers(state),
  status:    selectCustomersStatus(state),
});

const dispatcher = (dispatch) => ({
  loadCustomers: (organizationId) => dispatch(loadCustomers(organizationId)),
});

export default connect(select, dispatcher)(Customers);
