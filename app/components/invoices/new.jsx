import React from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'
import { routeActions } from 'react-router-redux'

import { getCurrentOrganizationId } from 'selectors'
import {
  loadCustomers,
  createInvoice as createInvoiceAction,
  addFlashMessage
} from 'actions'

import Form from './form.jsx'

class NewInvoice extends React.Component {
  constructor(props) {
    super(props)
    this.customersToOptions = this.customersToOptions.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterCreate = this.afterCreate.bind(this)
  }

  handleSubmit(values) {
    const { orgId, createInvoice } = this.props
    return createInvoice(
      orgId,
      {
        currency: values.currency,
        amount: values.amount,
        number: values.number,
        customerId: values.customerName,
        startsAt: values.startsAt,
        endsAt: values.endsAt,
        sentAt: values.sentAt,
        paidAt: values.paidAt,
        invoiceItemsAttributes: values.invoiceItems
      }
    )
  }

  afterCreate() {
    const { redirectToList, addFlashMessage } = this.props
    addFlashMessage('Invoice was created successfully')
    redirectToList()
  }

  componentDidMount() {
    const { orgId, loadCustomers } = this.props
    if (orgId) {
      loadCustomers(orgId)
    }
  }

  customersToOptions() {
    const { customers } = this.props
    const customers_options = [{ label: undefined, value: undefined }]
    customers.map((customer) => (
      customers_options.push({ label: customer.name, value: customer.id })
    ))
    return customers_options
  }

  render() {
    return(
      <Col sm={ 6 } smOffset={ 3 }>
        <div className='page-header'><h1>New Invoice</h1></div>
        <Form
          customers={ this.customersToOptions() }
          onSubmit={ this.handleSubmit }
          onSubmitSuccess={ this.afterCreate }
          action="Create"
        />
      </Col>
    )
  }
}

NewInvoice.propTypes = {
  orgId:            React.PropTypes.number,
  customers:        React.PropTypes.array,
  loadCustomers:    React.PropTypes.func,
  createInvoice:    React.PropTypes.func,
  redirectToList:   React.PropTypes.func,
  addFlashMessage:  React.PropTypes.func
}

const select = (state) => ({
  orgId:    getCurrentOrganizationId(state),
  customers: state.customers.items
})

const dispatcher = (dispatch) => ({
  loadCustomers: (organizationId) => dispatch(loadCustomers(organizationId)),
  createInvoice: (orgId, data) => new Promise((res, rej) => {
    dispatch(createInvoiceAction(orgId, data, res, rej))
  }),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
  redirectToList: () => dispatch(routeActions.push('/invoices'))
})

export default connect(select, dispatcher)(NewInvoice)
