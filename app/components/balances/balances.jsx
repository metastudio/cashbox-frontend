import React from 'react'

import { connect } from 'react-redux'
import moment from 'moment'
import { LinkContainer } from 'react-router-bootstrap'
import { NavDropdown, MenuItem } from 'react-bootstrap'

import { loadBalances, addFlashMessage } from 'actions'

class Balances extends React.Component {

  componentDidMount() {
    const { orgId, loadBalances } = this.props
    loadBalances(orgId)
  }

  render() {
    const balances = this.props.balances.map((balance, i) => (
      <LinkContainer to="#" key={i}>
        <MenuItem title={ balance.rate ? balance.currency + '/' + this.props.defaultCurrency + ', rate: ' + balance.rate + ', by: ' + moment(balance.updatedAt).format('L') : '' }>
          { balance.total } { balance.exTotal ? '(' + balance.exTotal + ')' : '' }
        </MenuItem>
      </LinkContainer>
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
  orgId:           React.PropTypes.number.isRequired,
  loadBalances:    React.PropTypes.func.isRequired,
  status:          React.PropTypes.string.isRequired,
  balances:        React.PropTypes.array.isRequired,
  totalAmount:     React.PropTypes.string.isRequired,
  defaultCurrency: React.PropTypes.string.isRequired,
}

const select = (state) => ({
  orgId:           state.currentOrganization.current ? state.currentOrganization.current.id : null,
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
