import React from 'react'
import * as statuses from 'constants/statuses'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { routeActions } from 'react-router-redux'
import { Table } from 'react-bootstrap'

import Spinner from 'components/utils/spinner'

import { loadTransactions, addFlashMessage } from 'actions'

class Transactions extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { orgId, index } = this.props
    index(orgId)
  }

  render() {
    if (!this.props.transactions) {
      return <Spinner />
    } else {
      const transactions = this.props.transactions.map((transaction) => (
        <tr key={ transaction.id }>
          <td>{ transaction.amount }</td>
          <td>{ transaction.category.name }</td>
          <td>{ transaction.bankAccount.name }</td>
          <td>{ transaction.customer.name }</td>
          <td>{ transaction.comment }</td>
          <td>{ transaction.date }</td>
        </tr>
        )
      )

      return (
        <Table striped responsive hover id="transactions">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Account</th>
              <th>Customer</th>
              <th>Comment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            { this.props.status == statuses.SUCCESS && transactions }
          </tbody>
        </Table>
      )
    }
  }
}

Transactions.propTypes = {
  addFlashMessage: React.PropTypes.func.isRequired,
  orgId:           React.PropTypes.number.isRequired,
  index:           React.PropTypes.func.isRequired,
  status:          React.PropTypes.string.isRequired,
}

const select = (state) => ({
  orgId:        state.currentOrganization.current.id,
  transactions: state.transactions.items,
  status:       state.transactions.status,
})

const dispatcher = (dispatch) => ({
  index:           (organizationId) => dispatch(loadTransactions(organizationId)),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(Transactions)
