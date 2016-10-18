import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { LinkContainer } from 'react-router-bootstrap'
import { NavItem } from 'react-bootstrap'

class CustomersItem extends Component {

  render() {
    if (this.props.hasOrganization) {
      return(
        <LinkContainer to="/customers">
          <NavItem>Customers</NavItem>
        </LinkContainer>
      )
    } else {
      return null
    }
  }
}

CustomersItem.propTypes = {
  hasOrganization: PropTypes.bool.isRequired,
}

const select = (state) => ({
  hasOrganization: !!state.currentOrganization.current,
})

export default connect(select, null)(CustomersItem)
