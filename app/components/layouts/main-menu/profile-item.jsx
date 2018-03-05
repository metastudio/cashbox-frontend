import React from 'react'
import { connect } from 'react-redux'
import { NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import LogoutItem from './logout-item.jsx'

class ProfileItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <NavDropdown title={ this.props.userFullName } id="user_links">
        <LinkContainer to="/user/profile" onlyActiveOnIndex>
          <MenuItem>Edit profile</MenuItem>
        </LinkContainer>
        <LogoutItem />
      </NavDropdown>
    )
  }
}

ProfileItem.propTypes = {
  userFullName: React.PropTypes.string
}

const select = (state) => ({
  userFullName: state.auth.user.fullName,
})

export default connect(select)(ProfileItem)