import React from 'react'
import { connect } from 'react-redux'
import { NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import LogoutItem from './logout-item.jsx'
import { userFullNameSelector } from 'selectors'

const ProfileItem = ({ userFullName }) => {
  return(
    <NavDropdown title={ userFullName } id="user_links">
      <LinkContainer to="/user/profile" onlyActiveOnIndex>
        <MenuItem>Edit profile</MenuItem>
      </LinkContainer>
      <LogoutItem />
    </NavDropdown>
  )
}

ProfileItem.propTypes = {
  userFullName: React.PropTypes.string
}

const select = (state) => ({
  userFullName: userFullNameSelector(state),
})

export default connect(select)(ProfileItem)
