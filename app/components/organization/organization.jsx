import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { Panel } from 'react-bootstrap'

import { createOrganization, addFlashMessage } from 'actions'

import Form from './form.jsx'

class Organization extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterCreate  = this.afterCreate.bind(this)
  }

  handleSubmit(values) {
    const { create } = this.props
    const { name, default_currency } = values
    return new Promise((resolve, reject) => {
      create(name, default_currency).then(({error, payload}) => error ? reject(payload) : resolve())
    })
  }

  afterCreate() {
    this.props.addFlashMessage('Organization successfully created.')
    this.props.redirectToRoot()
  }

  render() {
    return(
      <Panel>
        <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterCreate } />
      </Panel>
    )
  }
}

Organization.propTypes = {
  create:          React.PropTypes.func.isRequired,
  redirectToRoot:  React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
}

const dispatcher = (dispatch) => ({
  create:          (name, default_currency) => dispatch(createOrganization(name, default_currency)),
  redirectToRoot:  () => dispatch(routeActions.push('/')),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(null, dispatcher)(Organization)
