import React from 'react'

export const InvoiceTable = ({ invoice, userFullName }) => {
  const itemsHeader = (items, currency) => {
    if (items.length > 0) {
      return (
        <tr>
          <td><strong>Task</strong></td>
          <td><strong>Date</strong></td>
          <td className='text-right'><strong>Hours</strong></td>
          <td className='text-right'><strong>{ currency }</strong></td>
        </tr>
      )
    }
  }

  const items = invoice.invoiceItems.map((item, index) => (
    <tr key={ index } >
      <td>{ item.description }</td>
      <td>{ item.date }</td>
      <td className='text-right'>{ item.hours }</td>
      <td className='text-right'>{ item.amount }</td>
    </tr>
  ))

  const number = () => {
    if(invoice.number){
      return <p>
        <strong>Invoice #${invoice.number}</strong>
      </p>
    }
  }

  return(
    <table className="table invoice table-bordered ">
    <tbody>
      <tr>
        <td>
          <h2 className="word-break">
            { userFullName }
          </h2>
        </td>
        <td></td>
        <td></td>
        <td>
          <h1 className="text-right text-uppercase" style={{color: '#0c0cff'}}>
            Invoice
          </h1>
        </td>
      </tr>
      <tr>
        <td></td>
        <td className="word-break">
          Bank account for wire transfers:<br/>{ userFullName }
          <p>
            { invoice.invoiceDetails }
          </p>
          <br/>correspondent account<br/>
          { invoice.customerDetails}
          <br/>Currency: { invoice.currency }
        </td>
        <td></td>
        <td className="text-right">
          <strong className="text-uppercase">Date: { invoice.endsAt }</strong>
          { number }
        </td>
      </tr>
      <tr>
        <td>
          <div className="text-uppercase">
            Bill to:
          </div>
          { invoice.customerName }
        </td>
        <td></td>
        <td className="text-right">
          <h2>
            Total:
          </h2>
        </td>
        <td>
          <h2 className="text-right">
            { invoice.amount }
          </h2>
        </td>
      </tr>
      { itemsHeader(invoice.invoiceItems, invoice.currency) }
      { items }
    </tbody>
  </table>
  )
}

InvoiceTable.propTypes = {
  invoice:      React.PropTypes.object.isRequired,
  userFullName: React.PropTypes.string.isRequired
}
