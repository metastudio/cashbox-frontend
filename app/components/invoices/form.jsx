import React from 'react'
import { reduxForm } from 'redux-form'
import { Form, Alert, FormGroup, Col, Button } from 'react-bootstrap'

import {
  VerticalTextInput,
  VerticalDatePicker,
  VerticalCurrencyInput,
  VerticalSelect
} from 'components/utils/form-inputs'


const InvoiceForm = ({ fields: { currency, number, customerName, startsAt, endsAt, amount, sentAt, paidAt, invoiceItems }, customers, handleSubmit, submitting, error, action }) => {
  return(<Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <VerticalSelect 
      field={ currency }
      label="* Currency"
      collection={ [
        {label: undefined, value: undefined},
        {label: 'USD', value: 'USD'},
        {label: 'RUB', value: 'RUB'},
        {label: 'EUR', value: 'EUR'}
      ] }
    />

    <VerticalTextInput
      field={ number }
      label="Number"
    />

    <VerticalSelect
      field={ customerName }
      label="* Customer name"
      collection={ customers }
      placeholder='Customer'
    />

    <VerticalDatePicker
      field={ startsAt }
      label="Starts At"
      calendarPlacement='top'
      placeholder='Start date'
    />

    <VerticalDatePicker
      field={ endsAt }
      label="* Ends At"
      calendarPlacement='top'
      placeholder='End date'
    />

    <VerticalCurrencyInput
      field={ amount }
      label="* Amount"
    />

    <VerticalDatePicker
      field={ sentAt }
      label="Sent At"
      calendarPlacement='top'
      placeholder='Sent date'
    />

    <VerticalDatePicker
      field={ paidAt }
      label="Paid At"
      calendarPlacement='top'
      placeholder='Paid date'
    />

    <h3>Invoice items:</h3>
    {invoiceItems.map((child, index) => <div key={index}>
      <FormGroup key={ index }>
        <VerticalSelect
          field={ child.customerName }
          label="Customer name"
          collection={ customers }
          placeholder='Customer'
        />

        <VerticalCurrencyInput
          field={ child.amount }
          label="* Amount"
        />

        <VerticalDatePicker
          field={ child.date }
          label="Date"
          calendarPlacement='top'
          placeholder='Date'
        />

        <VerticalTextInput
          field={ child.hours }
          label='Hours'
          type='number'
        />

        <VerticalTextInput
          field={ child.description }
          label='Description'
          componentClass="textarea"
        />

        <a href='' onClick={(e) => {
          e.preventDefault()
          invoiceItems.removeField(index)
        }}><i/> Delete
        </a>
      </FormGroup>
    </div>
    )}

    <a href='' onClick={(e) => {
      e.preventDefault()
      invoiceItems.addField()
    }}><i/> Add Item
    </a>

    <FormGroup>
      <Col sm={9}>
        <Button bsStyle="primary" type="submit" disabled={ submitting }>{ action } Invoice</Button>
      </Col>
    </FormGroup>
  </Form>)
}

InvoiceForm.propTypes = {
  fields:       React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting:   React.PropTypes.bool,
  error:        React.PropTypes.string,
  store:        React.PropTypes.object,
  initialValue: React.PropTypes.object,
  customers:    React.PropTypes.array.isRequired,
  action:       React.PropTypes.string.isRequired
}

export default reduxForm({
  form: 'accountForm',
  fields: [
    'currency',
    'number',
    'customerName',
    'startsAt',
    'endsAt',
    'amount',
    'sentAt',
    'paidAt',
    'invoiceItems[].customerName',
    'invoiceItems[].amount',
    'invoiceItems[].date',
    'invoiceItems[].hours',
    'invoiceItems[].description',
    'invoiceItems[].id'
  ]
})(InvoiceForm)
