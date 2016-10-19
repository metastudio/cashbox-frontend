import React from 'react'
import * as statuses from 'constants/statuses'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { Panel, Row, Col } from 'react-bootstrap'

import LoadingView from 'components/utils/loading-view'
import { loadBankAccount, updateBankAccount, addFlashMessage } from 'actions'

import Form from './form.jsx'

class EditBankAccount extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterUpdate  = this.afterUpdate.bind(this)
  }

  componentDidMount() {
    const { orgId, loadBankAccount } = this.props
    loadBankAccount(orgId, this.props.params.bankAccountId).then(
      ({error, payload}) => {
        if (error) {
          this.props.addFlashMessage('Unable to load bank account. ' + payload, { type: 'danger' })
          this.props.redirectToBankAccounts()
        } else {
          payload
        }
      }
    )
  }

  handleSubmit(values) {
    const { orgId, bankAccount, updateBankAccount } = this.props
    return new Promise((resolve, reject) => {
      updateBankAccount(orgId, bankAccount.id, {
        name: values.name,
        description: values.description,
        invoiceDetails: values.invoiceDetails,
        currency: values.currency,
      }).then(({error, payload}) => error ? reject(payload) : resolve())
    })
  }

  afterUpdate() {
    this.props.addFlashMessage('Bank account successfully updated.')
    this.props.redirectToBankAccounts()
  }

  render() {
    return(
      <LoadingView status={ this.props.status }>
        { this.props.status == statuses.SUCCESS &&
          <Row>
            <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
              <Panel>
                <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterUpdate } />
              </Panel>
            </Col>
          </Row>
        }
      </LoadingView>
    )
  }
}

EditBankAccount.propTypes = {
  params:                 React.PropTypes.object.isRequired,
  orgId:                  React.PropTypes.number.isRequired,
  bankAccount:            React.PropTypes.object,
  status:                 React.PropTypes.string.isRequired,
  loadBankAccount:        React.PropTypes.func.isRequired,
  updateBankAccount:      React.PropTypes.func.isRequired,
  redirectToBankAccounts: React.PropTypes.func.isRequired,
  addFlashMessage:        React.PropTypes.func.isRequired,
}

const select = (state) => ({
  orgId:       state.currentOrganization.current.id,
  bankAccount: state.bankAccount.current,
  status:      state.bankAccount.status,
})

const dispatcher = (dispatch) => ({
  loadBankAccount:        (orgId, bankAccountId) => dispatch(loadBankAccount(orgId, bankAccountId)),
  updateBankAccount:      (orgId, bankAccountId, data) => dispatch(updateBankAccount(orgId, bankAccountId, data)),
  redirectToBankAccounts: () => dispatch(routeActions.push('/bank_accounts')),
  addFlashMessage:        (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(EditBankAccount)
