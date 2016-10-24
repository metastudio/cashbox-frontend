import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { Panel, Row, Col } from 'react-bootstrap'

import { createTransaction, addFlashMessage } from 'actions'
import { getCurrentOrganizationId } from 'selectors'

import Form from './form.jsx'

class NewTransaction extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterCreate  = this.afterCreate.bind(this)
  }

  handleSubmit(values) {
    const { orgId, createTransaction } = this.props
    return createTransaction(orgId, {
      amount: values.amount,
      categoryId: values.category,
      customerId: values.customer,
      bankAccountId: values.bankAccount,
      comment: values.comment,
      date: values.date,
    })
  }

  afterCreate() {
    this.props.addFlashMessage('Transaction successfully created.')
    this.props.redirectToRootPage()
  }

  render() {
    return(
      <Row>
        <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
          <Panel>
            <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterCreate } orgId={ this.props.orgId } />
          </Panel>
        </Col>
      </Row>
    )
  }
}

NewTransaction.propTypes = {
  orgId:              React.PropTypes.number.isRequired,
  createTransaction:  React.PropTypes.func.isRequired,
  redirectToRootPage: React.PropTypes.func.isRequired,
  addFlashMessage:    React.PropTypes.func.isRequired,
}

const select = (state) => ({
  orgId: getCurrentOrganizationId(state),
})

const dispatcher = (dispatch) => ({
  createTransaction:  (orgId, data) => new Promise((res, rej) => dispatch(createTransaction(orgId, data, res, rej))),
  redirectToRootPage: () => dispatch(routeActions.push('/')),
  addFlashMessage:    (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(NewTransaction)
