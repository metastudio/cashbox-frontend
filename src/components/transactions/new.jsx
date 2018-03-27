import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Panel, Row, Col } from 'react-bootstrap';

import { addFlashMessage } from 'actions/flash-messages.js';
import { createTransaction } from 'actions/transactions.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';

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
    this.props.addFlashMessage('Transaction successfully created.');
    this.props.history.push('/');
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
  orgId:              PropTypes.number.isRequired,
  createTransaction:  PropTypes.func.isRequired,
  addFlashMessage:    PropTypes.func.isRequired,
  history:            PropTypes.object.isRequired
}

const select = (state) => ({
  orgId: getCurrentOrganizationId(state),
})

const dispatcher = (dispatch) => ({
  createTransaction:  (orgId, data) => new Promise((res, rej) => dispatch(createTransaction(orgId, data, res, rej))),
  addFlashMessage:    (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default withRouter(connect(select, dispatcher)(NewTransaction));
