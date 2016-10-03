import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { Panel, Row, Col } from 'react-bootstrap'

import { createTransaction, addFlashMessage } from 'actions'

import Form from './form.jsx'

class NewTransaction extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterCreate  = this.afterCreate.bind(this)
  }

  handleSubmit(values) {
    const { orgId, create } = this.props
    return new Promise((resolve, reject) => {
      create(orgId, {
        amount: values.amount,
        categoryId: values.categoryId,
        customerId: values.customerId,
        bankAccountId: values.bankAccountId,
        comment: values.comment,
        date: values.date,
      }).then(({error, payload}) => error ? reject(payload) : resolve())
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
  create:             React.PropTypes.func.isRequired,
  redirectToRootPage: React.PropTypes.func.isRequired,
  addFlashMessage:    React.PropTypes.func.isRequired,
  loadBankAccounts:   React.PropTypes.func.isRequired,
}

const select = (state) => ({
  orgId: state.currentOrganization.current.id,
})

const dispatcher = (dispatch) => ({
  create:             (orgId, data) => dispatch(createTransaction(orgId, data)),
  loadBankAccounts:   (orgId) => dispatch(loadBankAccounts(orgId)),
  redirectToRootPage: () => dispatch(routeActions.push('/')),
  addFlashMessage:    (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(NewTransaction)
