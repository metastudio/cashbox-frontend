import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'

export const InvoiceRow = ({ invoice }) => {
  const dateOutput = (date) => (date ? date : '-')

  return(
    <tr>
      <td>{ invoice.customerName }</td>
      <td>{ dateOutput(invoice.startsAt) } { dateOutput(invoice.endsAt) }</td>
      <td>{ invoice.amount }</td>
      <td>{ invoice.sentAt }</td>
      <td>{ invoice.paidAt }</td>
      <td className='text-center'>
        <LinkContainer to={ `/invoices/${ invoice.id }` } >
          <Button bsStyle="link">Show</Button>
        </LinkContainer>
      </td>
    </tr>
  )
}

InvoiceRow.propTypes = {
  invoice:  React.PropTypes.object.isRequired,
  active:   React.PropTypes.string
}
