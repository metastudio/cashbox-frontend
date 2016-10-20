import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { Panel, Row, Col } from 'react-bootstrap'

import { createBankAccount, clearBankAccount, addFlashMessage } from 'actions'

import Form from './form.jsx'

class NewBankAccount extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterCreate  = this.afterCreate.bind(this)
  }

  componentDidMount() {
    this.props.clearBankAccount()
  }

  handleSubmit(values) {
    const { orgId, createBankAccount } = this.props
    return new Promise((resolve, reject) => {
      createBankAccount(orgId, {
        name: values.name,
        description: values.description,
        invoiceDetails: values.invoiceDetails,
        currency: values.currency,
      }).then(({error, payload}) => error ? reject(payload) : resolve())
    })
  }

  afterCreate() {
    this.props.addFlashMessage('Bank account successfully created.')
    this.props.redirectToBankAccounts()
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

NewBankAccount.propTypes = {
  orgId:                  React.PropTypes.number.isRequired,
  createBankAccount:      React.PropTypes.func.isRequired,
  clearBankAccount:       React.PropTypes.func.isRequired,
  redirectToBankAccounts: React.PropTypes.func.isRequired,
  addFlashMessage:        React.PropTypes.func.isRequired,
}

const select = (state) => ({
  orgId: state.currentOrganization.current.id,
})

const dispatcher = (dispatch) => ({
  createBankAccount:      (orgId, data) => dispatch(createBankAccount(orgId, data)),
  clearBankAccount:       () => dispatch(clearBankAccount()),
  redirectToBankAccounts: () => dispatch(routeActions.push('/bank_accounts')),
  addFlashMessage:        (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(NewBankAccount)
