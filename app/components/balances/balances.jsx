import React from 'react'

import { connect } from 'react-redux'
import moment from 'moment'
import { NavDropdown, MenuItem } from 'react-bootstrap'

import { loadBalances, addFlashMessage } from 'actions'
import { getCurrentOrganizationId } from 'selectors'

class Balances extends React.Component {

  componentDidMount() {
    const { orgId, loadBalances } = this.props
    if (orgId) {
      loadBalances(orgId)
    }
  }

  render() {
    const showTitle = (balance) => (
      balance.rate ? balance.currency + '/' + this.props.defaultCurrency + ', rate: ' + balance.rate + ', by: ' + moment(balance.updatedAt).format('L') : ''
    )

    const balances = this.props.balances.map((balance, i) => (
      <MenuItem key={i} title={ showTitle(balance) }>
        { balance.total } { balance.exTotal ? '(' + balance.exTotal + ')' : '' }
      </MenuItem>
      )
    )

    if (this.props.orgId && this.props.totalAmount) {
      return (
        <NavDropdown title={ 'Total: ' + this.props.totalAmount } id="balances-nav-dropdown">
          { balances }
        </NavDropdown>
      )
    } else {
      return null
    }
  }
}

Balances.propTypes = {
  addFlashMessage: React.PropTypes.func.isRequired,
  orgId:           React.PropTypes.number,
  loadBalances:    React.PropTypes.func.isRequired,
  status:          React.PropTypes.string.isRequired,
  balances:        React.PropTypes.array.isRequired,
  totalAmount:     React.PropTypes.string,
  defaultCurrency: React.PropTypes.string,
}

const select = (state) => ({
  orgId:           getCurrentOrganizationId(state),
  totalAmount:     state.balances.totalAmount,
  defaultCurrency: state.balances.defaultCurrency,
  balances:        state.balances.totals,
  status:          state.balances.status,
})

const dispatcher = (dispatch) => ({
  loadBalances:    (organizationId) => dispatch(loadBalances(organizationId)),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(Balances)
