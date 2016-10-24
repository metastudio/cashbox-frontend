import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { Panel, Row, Col } from 'react-bootstrap'

import { createCustomer, addFlashMessage } from 'actions'

import Form from './form.jsx'

class NewCustomer extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterCreate  = this.afterCreate.bind(this)
  }

  handleSubmit(values) {
    const { orgId, createCustomer } = this.props
    return new Promise((resolve, reject) => {
      createCustomer(orgId, {
        name: values.name,
        invoiceDetails: values.invoiceDetails,
      }).then(({error, payload}) => error ? reject(payload) : resolve())
    })
  }

  afterCreate() {
    this.props.addFlashMessage('Customer successfully created.')
    this.props.redirectToCustomers()
  }

  render() {
    return(
      <Row>
        <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
          <Panel>
            <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterCreate } />
          </Panel>
        </Col>
      </Row>
    )
  }
}

NewCustomer.propTypes = {
  orgId:               React.PropTypes.number.isRequired,
  createCustomer:      React.PropTypes.func.isRequired,
  redirectToCustomers: React.PropTypes.func.isRequired,
  addFlashMessage:     React.PropTypes.func.isRequired,
}

const select = (state) => ({
  orgId: state.currentOrganization.current.id,
})

const dispatcher = (dispatch) => ({
  createCustomer:      (orgId, data) => dispatch(createCustomer(orgId, data)),
  redirectToCustomers: () => dispatch(routeActions.push('/customers')),
  addFlashMessage:     (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(NewCustomer)
