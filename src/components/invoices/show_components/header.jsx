import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const Header = ({ invoice }) => {
  const number = () => {
    if(invoice.number) {
      return `#${invoice.number}`
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
  invoice: PropTypes.object.isRequired
}
