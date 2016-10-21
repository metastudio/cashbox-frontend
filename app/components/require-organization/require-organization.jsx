import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

import { addFlashMessage } from 'actions'
import { getHasCurrentOrganization } from 'selectors'

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
      props.addFlashMessage('Please select or add organization.', { type: 'info' })
      props.redirectToSelect()
      return
    }
  }

  isAllowed() {
    return this.props.hasOrganization
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
  hasOrganization:  React.PropTypes.bool.isRequired,
  redirectToSelect: React.PropTypes.func.isRequired,
  addFlashMessage:  React.PropTypes.func.isRequired,
  children:         React.PropTypes.node.isRequired,
}

const select = (state) => ({
  hasOrganization: getHasCurrentOrganization(state),
})

const dispatches = (dispatch) => ({
  redirectToSelect: () => dispatch(routeActions.push('/organizations/select')),
  addFlashMessage:  (message, options = {}) => dispatch(addFlashMessage(message, options)),
})

export default connect(select, dispatches)(RequireOrganization)
