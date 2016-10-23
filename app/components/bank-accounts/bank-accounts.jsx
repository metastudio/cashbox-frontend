import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { Link } from 'react-router'
import { Table, Button } from 'react-bootstrap'

import * as statuses from 'constants/statuses'

import { loadBankAccounts, deleteBankAccount, addFlashMessage } from 'actions'

import { getCurrentOrganizationId } from 'selectors'

import LoadingView from 'components/utils/loading-view'

class BankAccounts extends React.Component {
  constructor(props) {
    super(props)
    this.handleEditBankAccountClick = this.handleEditBankAccountClick.bind(this)
    this.handleDeleteBankAccountClick = this.handleDeleteBankAccountClick.bind(this)
  }

  componentDidMount() {
    const { orgId, loadBankAccounts } = this.props
    loadBankAccounts(orgId)
  }

  handleEditBankAccountClick(bankAccountId) {
    this.props.redirectToEditBankAccount(bankAccountId)
  }

  handleDeleteBankAccountClick(bankAccountId) {
    const { orgId, deleteBankAccount } = this.props
    deleteBankAccount(orgId, bankAccountId).then(
      ({error, payload}) => {
        if (error) {
          this.props.addFlashMessage('Unable to delete bank account. ' + payload, { type: 'danger' })
        } else {
          this.props.addFlashMessage('Bank account successfully deleted.')
          this.props.redirectToBankAccounts()
        }
      }
    )
  }

  render() {
    const bankAccounts = this.props.bankAccounts.map((bankAccount) => (
      <tr key={ bankAccount.id }>
        <td>{ bankAccount.name }</td>
        <td>{ bankAccount.currency }</td>
        <td>{ bankAccount.description }</td>
        <td>{ bankAccount.balance }</td>
        <td>{ bankAccount.invoiceDetails }</td>
        <td><Button bsStyle="primary" onClick={ () => this.handleEditBankAccountClick(bankAccount.id) }>Edit</Button></td>
        <td><Button bsStyle="danger" onClick={ () => this.handleDeleteBankAccountClick(bankAccount.id) }>Delete</Button></td>
      </tr>
      )
    )

    return (
      <LoadingView status={ this.props.status }>
        <Link to="/bank_accounts/new" className="btn btn-primary">Add...</Link>
        { this.props.status == statuses.SUCCESS &&
          <Table striped responsive hover id="bankAccounts">
            <thead>
              <tr>
                <th>Name</th>
                <th>Currency</th>
                <th>Description</th>
                <th>Balance</th>
                <th>Invoice Details</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { bankAccounts }
            </tbody>
          </Table>
        }
      </LoadingView>
    )
  }
}

BankAccounts.propTypes = {
  orgId:                     React.PropTypes.number.isRequired,
  loadBankAccounts:          React.PropTypes.func.isRequired,
  deleteBankAccount:         React.PropTypes.func.isRequired,
  status:                    React.PropTypes.string.isRequired,
  bankAccounts:              React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  redirectToEditBankAccount: React.PropTypes.func.isRequired,
  redirectToBankAccounts:    React.PropTypes.func.isRequired,
  addFlashMessage:           React.PropTypes.func.isRequired,
}

const select = (state) => ({
  orgId:        getCurrentOrganizationId(state),
  bankAccounts: state.bankAccounts.items,
  status:       state.bankAccounts.status,
})

const dispatcher = (dispatch) => ({
  loadBankAccounts:          (organizationId) => dispatch(loadBankAccounts(organizationId)),
  deleteBankAccount:         (organizationId, bankAccountId) => dispatch(deleteBankAccount(organizationId, bankAccountId)),
  redirectToEditBankAccount: (bankAccountId) => dispatch(routeActions.push(`/bank_accounts/${bankAccountId}/edit`)),
  redirectToBankAccounts:    () => dispatch(routeActions.push('/bank_accounts')),
  addFlashMessage:           (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(BankAccounts)
