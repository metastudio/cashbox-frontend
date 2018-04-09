import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'

import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { createInvoice as createInvoiceAction } from 'actions/invoices.js';
import { loadCustomers } from 'actions/customers.js';
import { addFlashMessage } from 'actions/flash-messages.js';

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
    const { redirectToList, addFlashMessage, history } = this.props
    addFlashMessage('Invoice was created successfully')
    history.push('/invoices')
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
  orgId:            PropTypes.number,
  customers:        PropTypes.array,
  loadCustomers:    PropTypes.func,
  createInvoice:    PropTypes.func,
  redirectToList:   PropTypes.func,
  addFlashMessage:  PropTypes.func
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
})

export default connect(select, dispatcher)(NewInvoice)
