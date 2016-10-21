import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

import * as statuses from 'constants/statuses'

import { loadBankAccounts } from 'actions'

import { getCurrentOragnizationId } from 'selectors'


import LoadingView from 'components/utils/loading-view'

class BankAccounts extends React.Component {

  componentDidMount() {
    const { orgId, loadBankAccounts } = this.props
    loadBankAccounts(orgId)
  }

  render() {
    const bankAccounts = this.props.bankAccounts.map((bankAccount) => (
      <tr key={ bankAccount.id }>
        <td>{ bankAccount.name } ({ bankAccount.currency })</td>
        <td>{ bankAccount.balance }</td>
      </tr>
      )
    )

    return (
      <LoadingView status={ this.props.status }>
        { this.props.status == statuses.SUCCESS &&
          <Table striped responsive id="bankAccounts">
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
  orgId:            React.PropTypes.number.isRequired,
  loadBankAccounts: React.PropTypes.func.isRequired,
  status:           React.PropTypes.string.isRequired,
  bankAccounts:     React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
}

const select = (state) => ({
  orgId:        getCurrentOragnizationId(state),
  bankAccounts: state.bankAccounts.items,
  status:       state.bankAccounts.status,
})

const dispatcher = (dispatch) => ({
  loadBankAccounts: (organizationId) => dispatch(loadBankAccounts(organizationId)),
})

export default connect(select, dispatcher)(BankAccounts)
