import React from 'react'
import * as statuses from 'constants/statuses'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table } from 'react-bootstrap'

import LoadingView from 'components/utils/loading-view'
import New from './new.jsx'

import { loadTransactions, addFlashMessage } from 'actions'
import { getCurrentOrganizationId } from 'selectors'

class Transactions extends React.Component {

  componentDidMount() {
    const { orgId, loadTransactions } = this.props
    loadTransactions(orgId)
  }

  render() {
    const transactions = this.props.transactions.map((transaction) => (
      <tr key={ transaction.id }>
        <td>{ transaction.amount }</td>
        <td>{ transaction.category.name }</td>
        <td>{ transaction.bankAccount.name }</td>
        <td>{ transaction.customer && transaction.customer.name }</td>
        <td>{ transaction.comment }</td>
        <td>{ moment(transaction.date).format('L') }</td>
      </tr>
      )
    )

    return (
      <LoadingView status={ this.props.status }>
        <Link to="/transactions/new" className="btn btn-primary">Add...</Link>
        { this.props.status == statuses.SUCCESS &&
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
        }
      </LoadingView>
    )
  }
}

Transactions.propTypes = {
  addFlashMessage:  React.PropTypes.func.isRequired,
  orgId:            React.PropTypes.number.isRequired,
  loadTransactions: React.PropTypes.func.isRequired,
  status:           React.PropTypes.string.isRequired,
  transactions:     React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
}

const select = (state) => ({
  orgId:        getCurrentOrganizationId(state),
  transactions: state.transactions.items,
  status:       state.transactions.status,
})

const dispatcher = (dispatch) => ({
  loadTransactions: (organizationId) => dispatch(loadTransactions(organizationId)),
  addFlashMessage:  (message, type = null) => dispatch(addFlashMessage(message, type)),
})

Transactions.New = New

export default connect(select, dispatcher)(Transactions)
