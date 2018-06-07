import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { addFlashMessage } from 'actions/flash-messages.js';
import { deleteCustomer } from 'actions/customers.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { confirm } from 'components/utils/confirm';

class DestroyCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteCustomerClick = this.handleDeleteCustomerClick.bind(this);
  }

  handleDeleteCustomerClick() {
    const { orgId, customer, deleteCustomer } = this.props;

    confirm('Are you sure?').then( () => {
      deleteCustomer(orgId, customer.id).then(customer => {
        this.props.addFlashMessage('Customer ' + customer.name + ' successfully deleted.');
        this.props.history.push('/customers');
      }).catch(error => {
        this.props.addFlashMessage(`Unable to delete customer: ${error.message}`, { type: 'danger' });
      });
    });
  }

  render() {
    return (
      <Link
        title="Delete"
        to={ '/customers' }
        onClick={ this.handleDeleteCustomerClick }>
        <i className="fa fa-trash-o" />
      </Link>
    );
  }
}

DestroyCustomer.propTypes = {
  orgId:           PropTypes.number.isRequired,
  deleteCustomer:  PropTypes.func.isRequired,
  customer:        PropTypes.object.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  history:         PropTypes.object.isRequired,
};

const select = (state) => ({
  orgId: getCurrentOrganizationId(state),
});

const dispatcher = (dispatch) => ({
  deleteCustomer: (organizationId, customerId) => new Promise((res, rej) => dispatch(deleteCustomer(organizationId, customerId, res, rej))),
  addFlashMessage:   (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect(select, dispatcher)(DestroyCustomer));
