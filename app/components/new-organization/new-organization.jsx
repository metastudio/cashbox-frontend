import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { Panel } from 'react-bootstrap'

import { createOrganization, setCurrentOrganization, addFlashMessage } from 'actions'

import Form from './form.jsx'

class NewOrganization extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterCreate  = this.afterCreate.bind(this)
  }

  handleSubmit(values) {
    const { create } = this.props
    return new Promise((resolve, reject) => {
      create({
        name: values.name,
        defaultCurrency: values.defaultCurrency
      }).then(({error, payload}) => error ? reject(payload) : resolve())
    })
  }

  afterCreate() {
    this.props.addFlashMessage('Organization successfully created.')
    this.props.setOrganization(this.props.id) // TODO: how to get ID of this newly created organization?
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

NewOrganization.propTypes = {
  create:          React.PropTypes.func.isRequired,
  redirectToRoot:  React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  setOrganization: React.PropTypes.func.isRequired,
}

const dispatcher = (dispatch) => ({
  create:          (data) => dispatch(createOrganization(data)),
  redirectToRoot:  () => dispatch(routeActions.push('/')),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
  setOrganization: (organizationId) => dispatch(setCurrentOrganization(organizationId)),
})

export default connect(null, dispatcher)(NewOrganization)
