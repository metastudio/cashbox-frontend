import React from 'react';
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import moment from 'moment'
import { NavDropdown, MenuItem } from 'react-bootstrap'

import { addFlashMessage } from 'actions/flash-messages.js';
import { loadOrganizationBalances } from 'actions/balances.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';

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
  addFlashMessage: PropTypes.func.isRequired,
  orgId:           PropTypes.number,
  loadBalances:    PropTypes.func.isRequired,
  status:          PropTypes.string.isRequired,
  balances:        PropTypes.array.isRequired,
  totalAmount:     PropTypes.string,
  defaultCurrency: PropTypes.string,
}

const select = (state) => ({
  orgId:           getCurrentOrganizationId(state),
  totalAmount:     state.balances.totalAmount,
  defaultCurrency: state.balances.defaultCurrency,
  balances:        state.balances.totals,
  status:          state.balances.status,
})

const dispatcher = (dispatch) => ({
  loadBalances:    (organizationId) => dispatch(loadOrganizationBalances(organizationId)),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(Balances)
