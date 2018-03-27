import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js';
import { addFlashMessage } from 'actions/flash-messages.js';
import { loadCustomers, deleteCustomer } from 'actions/customers.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';

import LoadingView from 'components/utils/loading-view';

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteCustomerClick = this.handleDeleteCustomerClick.bind(this);
  }

  componentDidMount() {
    const { orgId, loadCustomers } = this.props;
    loadCustomers(orgId);
  }

  handleDeleteCustomerClick(customerId) {
    const { orgId, deleteCustomer } = this.props;
    deleteCustomer(orgId, customerId).then(customer => {
      this.props.addFlashMessage('Customer ' + customer.name + ' successfully deleted.');
      this.props.history.push('/customers');
    }).catch(error => {
      this.props.addFlashMessage(`Unable to delete customer: ${error.message}`, { type: 'danger' });
    });
  }

  render() {
    const customers = this.props.customers.map((customer) => (
      <tr key={ customer.id }>
        <td>{ customer.name }</td>
        <td>{ customer.invoiceDetails }</td>
        <td><Link to={ `/customers/${customer.id}/edit` } className="btn btn-primary">Edit</Link></td>
        <td><Button bsStyle="danger" onClick={ () => this.handleDeleteCustomerClick(customer.id) }>Delete</Button></td>
      </tr>
    )
    );

    return (
      <LoadingView status={ this.props.status }>
        <Link to="/customers/new" className="btn btn-primary">Add...</Link>
        { this.props.status === statuses.SUCCESS &&
          <Table striped responsive hover id="customers">
            <thead>
              <tr>
                <th>Name</th>
                <th>Invoice Details</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { customers }
            </tbody>
          </Table>
        }
      </LoadingView>
    );
  }
}

Customers.propTypes = {
  orgId:                  PropTypes.number.isRequired,
  loadCustomers:          PropTypes.func.isRequired,
  deleteCustomer:         PropTypes.func.isRequired,
  status:                 PropTypes.string.isRequired,
  customers:              PropTypes.arrayOf(PropTypes.object).isRequired,
  addFlashMessage:        PropTypes.func.isRequired,
  history:                PropTypes.object.isRequired,
};

const select = (state) => ({
  orgId:     getCurrentOrganizationId(state),
  customers: state.customers.items,
  status:    state.customers.status,
});

const dispatcher = (dispatch) => ({
  loadCustomers:   (organizationId) => dispatch(loadCustomers(organizationId)),
  deleteCustomer:  (organizationId, customerId) => new Promise((res, rej) => dispatch(deleteCustomer(organizationId, customerId, res, rej))),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect(select, dispatcher)(Customers));
