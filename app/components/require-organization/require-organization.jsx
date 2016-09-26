import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

import { addFlashMessage } from 'actions'

class RequireOrganization extends React.Component {
  constructor(props) {
    super(props)

    this.isAllowed = this.isAllowed.bind(this)
  }
  componentDidMount() {
    this.checkOrganization(this.props)
  }

  componentWillReceiveProps(props) {
    this.checkOrganization(props)
  }

  checkOrganization(props){
    if (!props.hasOrganization) {
      props.addFlashMessage('Please add organization.', { type: 'info' })
      props.redirectToNewOrganization()
      return
    }
    if (props.requireAdmin && !props.isAdmin) {
      props.addFlashMessage('You are not allowed to access this page.', { type: 'danger' })
      props.redirectToRoot()
      return
    }
  }

  isAllowed() {
    return this.props.hasOrganization && (!this.props.requireAdmin || this.props.isAdmin)
  }

  render() {
    if (this.isAllowed()) {
      return this.props.children
    } else {
      return null
    }
  }
}

RequireOrganization.propTypes = {
  requireAdmin:              React.PropTypes.bool,
  hasOrganization:           React.PropTypes.bool.isRequired,
  isAdmin:                   React.PropTypes.bool.isRequired,
  redirectToRoot:            React.PropTypes.func.isRequired,
  redirectToNewOrganization: React.PropTypes.func.isRequired,
  addFlashMessage:           React.PropTypes.func.isRequired,
  children:                  React.PropTypes.node.isRequired,
}

const select = (state) => ({
  hasOrganization: !!state.organizations.current,
  isAdmin:         !!(state.auth.user && state.auth.user.isAdmin),
})

const dispatches = (dispatch) => ({
  redirectToNewOrganization: () => dispatch(routeActions.push('/organizations/new')),
  redirectToRoot:            () => dispatch(routeActions.push('/')),
  addFlashMessage:           (message, options = {}) => dispatch(addFlashMessage(message, options)),
})

export default connect(select, dispatches)(RequireOrganization)
