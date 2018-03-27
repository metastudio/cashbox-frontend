import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import { addFlashMessage } from 'actions/flash-messages.js';

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
      props.history.push('/login');
      return
    }
    if (props.requireAdmin && !props.isAdmin) {
      props.addFlashMessage('You are not allowed to access this page.', { type: 'danger' })
      props.history.push('/');
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
      return null;
    }
  }
}

RequireLogin.propTypes = {
  requireAdmin:    PropTypes.bool,
  isAuthorized:    PropTypes.bool.isRequired,
  isAdmin:         PropTypes.bool.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  children:        PropTypes.node.isRequired,
  history:         PropTypes.object.isRequired
}

const select = (state) => ({
  isAuthorized: !!state.auth.token,
  isAdmin:      !!(state.auth.user && state.auth.user.isAdmin),
})

const dispatches = (dispatch) => ({
  addFlashMessage: (message, options = {}) => dispatch(addFlashMessage(message, options)),
})

export default withRouter(connect(select, dispatches)(RequireLogin));
