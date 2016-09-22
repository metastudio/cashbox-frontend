import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

import { addFlashMessage } from 'actions'

class RequireLogin extends React.Component {
  constructor(props) {
    super(props)

    this.isAllowed = this.isAllowed.bind(this)
  }
  componentDidMount() {
    this.checkAuth(this.props)
  }

  componentWillReceiveProps(props) {
    this.checkAuth(props)
  }

  checkAuth(props){
    if (!props.isAuthorized) {
      props.addFlashMessage('Login is required.', { type: 'danger' })
      props.redirectToLoginPage()
      return
    }
    if (props.requireAdmin && !props.isAdmin) {
      props.addFlashMessage('You are not allowed to access this page.', { type: 'danger' })
      props.redirectToRoot()
      return
    }
  }

  isAllowed() {
    return this.props.isAuthorized && (!this.props.requireAdmin || this.props.isAdmin)
  }

  render() {
    if (this.isAllowed()) {
      return this.props.children
    } else {
      return null
    }
  }
}

RequireLogin.propTypes = {
  requireAdmin:        React.PropTypes.bool,
  isAuthorized:        React.PropTypes.bool.isRequired,
  isAdmin:             React.PropTypes.bool.isRequired,
  redirectToRoot:      React.PropTypes.func.isRequired,
  redirectToLoginPage: React.PropTypes.func.isRequired,
  addFlashMessage:     React.PropTypes.func.isRequired,
  children:            React.PropTypes.node.isRequired,
}

const select = (state) => ({
  isAuthorized: !!state.auth.token,
  isAdmin:      !!(state.auth.user && state.auth.user.isAdmin),
})

const dispatches = (dispatch) => ({
  redirectToRoot:      () => dispatch(routeActions.push('/')),
  redirectToLoginPage: () => dispatch(routeActions.push('/login')),
  addFlashMessage:     (message, options = {}) => dispatch(addFlashMessage(message, options)),
})

export default connect(select, dispatches)(RequireLogin)
