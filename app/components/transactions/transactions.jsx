import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { routeActions } from 'react-router-redux'
import { Table } from 'react-bootstrap'

import Spinner from 'components/utils/spinner'

import { currentOrganization, loadTransactions, addFlashMessage } from 'actions'

class Transactions extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.currentOrganization().then(({error, payload}) => error ? reject(payload) : this.props.index(payload.organization.id))
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
            { transactions }
          </tbody>
        </Table>
      )
    }
  }
}

Transactions.propTypes = {
  addFlashMessage:     React.PropTypes.func.isRequired,
  currentOrganization: React.PropTypes.func.isRequired,
}

const select = (state) => ({
  transactions: !!(state.currentOrganization.transactions && state.organizations.current)
})

const dispatcher = (dispatch) => ({
  index:           (organizationId) => dispatch(loadTransactions(organizationId)),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
  currentOrganization: () => dispatch(currentOrganization()),
})

export default connect(select, dispatcher)(Transactions)
