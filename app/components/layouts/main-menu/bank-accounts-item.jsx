import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { LinkContainer } from 'react-router-bootstrap'
import { NavItem } from 'react-bootstrap'

class BankAccountsItem extends Component {

  render() {
    if (this.props.hasOrganization) {
      return(
        <LinkContainer to="/bank_accounts">
          <NavItem>Bank accounts</NavItem>
        </LinkContainer>
      )
    } else {
      return null
    }
  }
}

BankAccountsItem.propTypes = {
  hasOrganization: PropTypes.bool.isRequired,
}

const select = (state) => ({
  hasOrganization: !!state.currentOrganization.current,
})

export default connect(select, null)(BankAccountsItem)
