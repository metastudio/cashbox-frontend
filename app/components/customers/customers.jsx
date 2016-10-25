import React from 'react'
import * as statuses from 'constants/statuses'

import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { Link } from 'react-router'
import { Table, Button } from 'react-bootstrap'

import LoadingView from 'components/utils/loading-view'

import { loadCustomers, deleteCustomer, addFlashMessage } from 'actions'
import { getCurrentOrganizationId } from 'selectors'

class Customers extends React.Component {
  constructor(props) {
    super(props)
    this.handleEditCustomerClick = this.handleEditCustomerClick.bind(this)
    this.handleDeleteCustomerClick = this.handleDeleteCustomerClick.bind(this)
  }

  componentDidMount() {
    const { orgId, loadCustomers } = this.props
    loadCustomers(orgId)
  }

  handleEditCustomerClick(customerId) {
    this.props.redirectToEditCustomer(customerId)
  }

  handleDeleteCustomerClick(customerId) {
    const { orgId, deleteCustomer } = this.props
    deleteCustomer(orgId, customerId).then(customer => {
      this.props.addFlashMessage('Customer ' + customer.name + ' successfully deleted.')
      this.props.redirectToCustomers()
    }).catch(error => {
      this.props.addFlashMessage(`Unable to delete customer: ${error.message}`, { type: 'danger' })
    })
  }

  render() {
    const customers = this.props.customers.map((customer) => (
      <tr key={ customer.id }>
        <td>{ customer.name }</td>
        <td>{ customer.invoiceDetails }</td>
        <td><Button bsStyle="primary" onClick={ () => this.handleEditCustomerClick(customer.id) }>Edit</Button></td>
        <td><Button bsStyle="danger" onClick={ () => this.handleDeleteCustomerClick(customer.id) }>Delete</Button></td>
      </tr>
      )
    )

    return (
      <LoadingView status={ this.props.status }>
        <Link to="/customers/new" className="btn btn-primary">Add...</Link>
        { this.props.status == statuses.SUCCESS &&
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
    )
  }
}

Customers.propTypes = {
  orgId:                  React.PropTypes.number.isRequired,
  loadCustomers:          React.PropTypes.func.isRequired,
  deleteCustomer:         React.PropTypes.func.isRequired,
  status:                 React.PropTypes.string.isRequired,
  customers:              React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  redirectToEditCustomer: React.PropTypes.func.isRequired,
  redirectToCustomers:    React.PropTypes.func.isRequired,
  addFlashMessage:        React.PropTypes.func.isRequired,
}

const select = (state) => ({
  orgId:     getCurrentOrganizationId(state),
  customers: state.customers.items,
  status:    state.customers.status,
})

const dispatcher = (dispatch) => ({
  loadCustomers:          (organizationId) => dispatch(loadCustomers(organizationId)),
  deleteCustomer:         (organizationId, customerId) => new Promise((res, rej) => dispatch(deleteCustomer(organizationId, customerId, res, rej))),
  redirectToEditCustomer: (customerId) => dispatch(routeActions.push(`/customers/${customerId}/edit`)),
  redirectToCustomers:    () => dispatch(routeActions.push('/customers')),
  addFlashMessage:        (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(Customers)
