import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'
import { find } from 'lodash'

import { getCurrentOrganizationId } from 'selectors/organizations.js'
import { invoiceSelector } from 'selectors/invoices.js'
import {
  updateInvoice as updateInvoiceAction,
  loadInvoice
} from 'actions/invoices.js'
import { loadCustomers } from 'actions/customers.js'
import { addFlashMessage } from 'actions/flash-messages.js'

import Form from './form.jsx'

class EditInvoice extends React.Component {
  constructor(props) {
    super(props)
    this.customersToOptions = this.customersToOptions.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterCreate = this.afterCreate.bind(this)
    this.initialPrepare = this.initialPrepare.bind(this)
  }

  handleSubmit(values) {
    const { orgId, updateInvoice } = this.props
    const preparePrice = (price) => parseFloat(price.split(',').join(''))
    return updateInvoice(
      orgId,
      this.props.match.params.id,
      {
        currency: values.currency,
        amount: preparePrice(values.amount),
        number: values.number,
        customerId: values.customerName,
        startsAt: values.startsAt,
        endsAt: values.endsAt,
        sentAt: values.sentAt,
        paidAt: values.paidAt,
        invoiceItemsAttributes: values.invoiceItems.map((item) => ({
          id: item.id,
          customerId: item.customerName,
          date: item.date,
          hours: item.hours,
          description: item.description,
          amount: preparePrice(item.amount)
        }))
      }
    )
  }

  initialPrepare(invoice) {
    const customerId = (name) => {
      const customer = find(this.props.customers, { name: name })
      if(customer) {
        return(customer.id)
      }
    }

    const convertDate = (date) => {
      const dateSeparator = date.includes('/') ? '/' : '-'
      const [day, month, year] = date.split(dateSeparator)
      const result = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      return result.toISOString()
    }

    return({
      amount: invoice.amount,
      currency: invoice.currency,
      customerDetails: invoice.customerDetails || '',
      customerName: customerId(invoice.customerName),
      endsAt: convertDate(invoice.endsAt),
      invoiceDetails: invoice.invoiceDetails || '',
      number: invoice.number || '',
      startsAt: invoice.startsAt ? convertDate(invoice.startsAt) : '',
      sentAt: invoice.sentAt ? convertDate(invoice.sentAt) : '',
      paidAt: invoice.paidAt ? convertDate(invoice.paidAt) : '',
      invoiceItems: invoice.invoiceItems.map((item) => ({
        amount: item.amount,
        date:   item.date ? convertDate(item.date) : '',
        hours: item.hours || '',
        description: item.description || '',
        id: item.id,
        customerName: customerId(item.customerName)
      }))
    })
  }

  afterCreate() {
    const { redirectToList, addFlashMessage, history } = this.props
    addFlashMessage('Invoice was updated successfully')
    history.push('/invoices')
  }

  componentDidMount() {
    const { orgId, loadCustomers, customers, invoice, match, loadInvoice } = this.props
    if (customers <= 0) {
      loadCustomers(orgId)
    }
    if (!invoice) {
      loadInvoice(orgId, match.params.id)
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
    if(this.props.invoice && this.props.customers) {
      return(
        <Col sm={ 6 } smOffset={ 3 }>
          <div className='page-header'><h1>New Invoice</h1></div>
          <Form
            customers={ this.customersToOptions() }
            onSubmit={ this.handleSubmit }
            onSubmitSuccess={ this.afterCreate }
            initialValues={ this.initialPrepare(this.props.invoice) }
            action="Update"
          />
        </Col>
      )
    } else {
      return(<div>Loading...</div>)
    }
  }
}

EditInvoice.propTypes = {
  orgId:            PropTypes.number,
  customers:        PropTypes.array,
  loadCustomers:    PropTypes.func,
  updateInvoice:    PropTypes.func,
  addFlashMessage:  PropTypes.func,
  initialValues:    PropTypes.object,
  invoice:          PropTypes.object,
  loadInvoice:      PropTypes.func.isRequired
}

const select = (state, props) => ({
  orgId:      getCurrentOrganizationId(state),
  customers:  state.customers.items,
  invoice:    invoiceSelector(state, props.match.params.id)
})

const dispatcher = (dispatch) => ({
  loadCustomers: (organizationId) => dispatch(loadCustomers(organizationId)),
  updateInvoice: (orgId, invoiceId, data) => new Promise((res, rej) => {
    dispatch(updateInvoiceAction(orgId, invoiceId, data, res, rej))
  }),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
  loadInvoice: (organizationId, invoiceId) => dispatch(loadInvoice(organizationId, invoiceId))
})

export default connect(select, dispatcher)(EditInvoice)
