import React from 'react'
import { Link } from 'react-router'

export const Header = ({ invoice }) => {
  const number = () => {
    if(invoice.number) {
      return `#${invoice.numnber}`
    }
  }

  const invoiceDateRange = () => {
    return([invoice.startsAt, invoice.endsAt].filter(x => !!x).join(' - '))
  }

  return <h2>
    <Link to='/invoices/list'>Invoices</Link>
    &nbsp;/
    Invoice { number() } { invoice.customerName } from { invoiceDateRange() }
  </h2>
}

Header.propTypes = {
  invoice: React.PropTypes.object.isRequired
}
