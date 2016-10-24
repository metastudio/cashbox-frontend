import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { Panel, Row, Col } from 'react-bootstrap'

import { createCustomer, clearCustomer, addFlashMessage } from 'actions'
import { getCurrentOrganizationId } from 'selectors'

import Form from './form.jsx'

class NewCustomer extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterCreate  = this.afterCreate.bind(this)
  }

  componentDidMount() {
    this.props.clearCustomer()
  }

  handleSubmit(values) {
    const { orgId, createCustomer } = this.props
    return createCustomer(orgId, {
      name: values.name,
      invoiceDetails: values.invoiceDetails,
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
  clearCustomer:       React.PropTypes.func.isRequired,
  redirectToCustomers: React.PropTypes.func.isRequired,
  addFlashMessage:     React.PropTypes.func.isRequired,
}

const select = (state) => ({
  orgId: getCurrentOrganizationId(state),
})

const dispatcher = (dispatch) => ({
  createCustomer:      (orgId, data) => new Promise((res, rej) => dispatch(createCustomer(orgId, data, res, rej))),
  clearCustomer:       () => dispatch(clearCustomer()),
  redirectToCustomers: () => dispatch(routeActions.push('/customers')),
  addFlashMessage:     (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(NewCustomer)
