import React from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'
import { routeActions } from 'react-router-redux'
import { find } from 'lodash'

import { getCurrentOrganizationId } from 'selectors'
import { invoiceSelector } from 'selectors/invoices'
import {
  loadCustomers,
  updateInvoice as updateInvoiceAction,
  addFlashMessage,
  loadInvoice
} from 'actions'

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
    return updateInvoice(
      orgId,
      this.props.params.id,
      {
        currency: values.currency,
        amount: values.amount,
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
          description: item.description
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
      const [day, month, year] = date.split('/')
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
    const { redirectToList, addFlashMessage } = this.props
    addFlashMessage('Invoice was updated successfully')
    redirectToList()
  }

  componentDidMount() {
    const { orgId, loadCustomers, customers, invoice, params, loadInvoice } = this.props
    if (customers <= 0) {
      loadCustomers(orgId)
    }
    if (!invoice) {
      loadInvoice(orgId, params.id)
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
  orgId:            React.PropTypes.number,
  customers:        React.PropTypes.array,
  loadCustomers:    React.PropTypes.func,
  updateInvoice:    React.PropTypes.func,
  redirectToList:   React.PropTypes.func,
  addFlashMessage:  React.PropTypes.func,
  initialValues:    React.PropTypes.object,
  invoice:          React.PropTypes.object,
  loadInvoice:      React.PropTypes.func.isRequired,
  params:           React.PropTypes.object.isRequired
}

const select = (state, props) => ({
  orgId:      getCurrentOrganizationId(state),
  customers:  state.customers.items,
  invoice:    invoiceSelector(state, props.params.id)
})

const dispatcher = (dispatch) => ({
  loadCustomers: (organizationId) => dispatch(loadCustomers(organizationId)),
  updateInvoice: (orgId, invoiceId, data) => new Promise((res, rej) => {
    dispatch(updateInvoiceAction(orgId, invoiceId, data, res, rej))
  }),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
  redirectToList: () => dispatch(routeActions.push('/invoices')),
  loadInvoice: (organizationId, invoiceId) => dispatch(loadInvoice(organizationId, invoiceId))
})

export default connect(select, dispatcher)(EditInvoice)
