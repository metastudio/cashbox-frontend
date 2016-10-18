import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { LinkContainer } from 'react-router-bootstrap'
import { NavItem } from 'react-bootstrap'

class MembersItem extends Component {

  render() {
    if (this.props.hasOrganization) {
      return(
        <LinkContainer to="/members">
          <NavItem>Members</NavItem>
        </LinkContainer>
      )
    } else {
      return null
    }
  }
}

MembersItem.propTypes = {
  hasOrganization: PropTypes.bool.isRequired,
}

const select = (state) => ({
  hasOrganization: !!state.currentOrganization.current,
})

export default connect(select, null)(MembersItem)
