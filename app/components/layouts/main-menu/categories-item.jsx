import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { LinkContainer } from 'react-router-bootstrap'
import { NavItem } from 'react-bootstrap'

class CategoriesItem extends Component {

  render() {
    if (this.props.hasOrganization) {
      return(
        <LinkContainer to="/categories">
          <NavItem>Categories</NavItem>
        </LinkContainer>
      )
    } else {
      return null
    }
  }
}

CategoriesItem.propTypes = {
  hasOrganization: PropTypes.bool.isRequired,
}

const select = (state) => ({
  hasOrganization: !!state.currentOrganization.current,
})

export default connect(select, null)(CategoriesItem)
