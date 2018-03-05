import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

import { MenuItem } from 'react-bootstrap'

import { logoutUser, addFlashMessage } from 'actions'

class LogoutItem extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.checkIsAuthorized(this.props)
  }

  componentWillReceiveProps(props) {
    this.checkIsAuthorized(props)
  }

  checkIsAuthorized(props){
    if (!props.isAuthorized) {
      props.afterLogout()
    }
  }

  handleClick(e) {
    e.preventDefault()
    this.props.logout().then(() => {
      this.props.addFlashMessage('You successfully signed out.')
    })
  }

  render() {
    return(
      <MenuItem onClick={ this.handleClick } rel="nofollow">
        Sign out
      </MenuItem>
    )
  }
}

LogoutItem.propTypes = {
  isAuthorized:    PropTypes.bool,
  logout:          PropTypes.func.isRequired,
  afterLogout:     PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
}

const select = (state) => ({
  isAuthorized: !!state.auth.token,
})

const dispatcher = (dispatch) => ({
  logout:          () => new Promise((res, rej) => dispatch(logoutUser(res, rej))),
  afterLogout:     () => dispatch(routeActions.push('/login')),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(LogoutItem)
