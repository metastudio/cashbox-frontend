import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'

export const TableHeader = ({ unpaid, s }) => {
  const toggleSortIndex = (sortIndex) => {
    if (sortIndex === 'asc') {
      return('desc')
    } else {
      return('asc')
    }
  }

  const prepareLink = (sort) => {
    let link = `/invoices/list?q[s]=${sort}`
    if (s && s.includes(sort)) {
      const sortIndex = s.split(' ')[1]
      link = `${link}+${toggleSortIndex(sortIndex)}`
    } else if (sort === 'ends_at'){
      link = `${link}+desc`
    } else {
      link = `${link}+asc`
    }

    if (unpaid) {
      return(`${link}&q[unpaid]=true`)
    } else {
      return(link)
    }
  }

  const prepareTitle = ({title, sort}) => {
    const ascRender = '▼'
    const descRender = '▲'
    if (s && s.includes(sort)) {
      const sortIndex = s.split(' ')[1]
      if (sortIndex === 'asc') {
        return(`${title} ${ascRender}`)
      } else {
        return(`${title} ${descRender}`)
      }
    } else if (!s && sort === 'ends_at') {
      return(`${title} ${ascRender}`)
    } else {
      return(title)
    }
  }

  const headers = [
    { sort: 'customer_name', title: 'Customer' },
    { sort: 'ends_at', title: 'Date range' },
    { sort: 'amount_cents', title: 'Invoice total' },
    { sort: 'sent_at', title: 'Sent date' },
    { sort: 'paid_at', title: 'Paid date' },
  ]

  const renderHeaders = headers.map((header) => (
    <th key={ header.sort }>
      <LinkContainer to={ prepareLink(header.sort) } >
        <Button bsStyle="link">
          { prepareTitle(header) }
        </Button>
      </LinkContainer>
    </th>
  ))

  return(
    <tr>
      { renderHeaders }
      <th></th>
    </tr>
  )
}

TableHeader.propTypes = {
  unpaid: React.PropTypes.bool,
  s:      React.PropTypes.string
}

