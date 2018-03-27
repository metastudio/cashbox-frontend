import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js';
import { addFlashMessage } from 'actions/flash-messages.js';
import { loadTransactions } from 'actions/transactions.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';

import LoadingView from 'components/utils/loading-view'
import New from './new.jsx'

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
  addFlashMessage:  PropTypes.func.isRequired,
  orgId:            PropTypes.number.isRequired,
  loadTransactions: PropTypes.func.isRequired,
  status:           PropTypes.string.isRequired,
  transactions:     PropTypes.arrayOf(PropTypes.object).isRequired,
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
