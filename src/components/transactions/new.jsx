import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Modal, Button, Row, Col, Tabs, Tab } from 'react-bootstrap';

import { addFlashMessage } from 'actions/flash-messages.js';
import { createTransaction, createTransfer } from 'actions/transactions.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { prepareSubmissionError } from 'utils/errors';

import Form from './form.jsx'
import TransferForm from './transfer-form.jsx'

class NewTransaction extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTransferSubmit = this.handleTransferSubmit.bind(this)
    this.afterCreate  = this.afterCreate.bind(this)
    this.afterTransferCreate = this.afterTransferCreate.bind(this)
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTabSelect = this.handleTabSelect.bind(this);

    this.state = {
      show: false,
      key: 1
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleTabSelect(key) {
    this.setState({ key: key });
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
    }).catch(prepareSubmissionError);
  }

  handleTransferSubmit(values) {
    const { orgId, createTransfer } = this.props
    return createTransfer(orgId, {
      bankAccountId: values.fromBankAccount,
      referenceId: values.toBankAccount,
      amount: values.amount,
      exchangeRate: values.exchangeRate,
      comission: values.comission,
      comment: values.comment,
      date: values.date,
    }).catch(prepareSubmissionError);
  }

  afterCreate() {
    this.props.addFlashMessage('Transaction successfully created.');
    this.handleClose();
  }

  afterTransferCreate() {
    this.props.addFlashMessage('Transfer successfully created.');
    this.handleClose();
  }

  render() {
    return(
      <div>
        <Button bsStyle="primary" onClick={ this.handleShow } >Add...</Button>
        <Modal show={ this.state.show } onHide={ this.handleClose }>
          <Modal.Header closeButton>
            <Modal.Title>New Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs activeKey={ this.state.key } onSelect={ this.handleTabSelect } id="transactionType">
              <Tab eventKey={ 1 } title="Income">
                <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterCreate } orgId={ this.props.orgId } type="Income" />
              </Tab>
              <Tab eventKey={ 2 } title="Expense">
                <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterCreate } orgId={ this.props.orgId } type="Expense" />
              </Tab>
              <Tab eventKey={ 3 } title="Transfer">
                <TransferForm onSubmit={ this.handleTransferSubmit } onSubmitSuccess={ this.afterTransferCreate } orgId={ this.props.orgId } />
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

NewTransaction.propTypes = {
  orgId:              PropTypes.number.isRequired,
  createTransaction:  PropTypes.func.isRequired,
  createTransfer:     PropTypes.func.isRequired,
  addFlashMessage:    PropTypes.func.isRequired,
  history:            PropTypes.object.isRequired
}

const select = (state) => ({
  orgId: getCurrentOrganizationId(state),
})

const dispatcher = (dispatch) => ({
  createTransaction: (orgId, data) => new Promise((res, rej) => dispatch(createTransaction(orgId, data, res, rej))),
  createTransfer:    (orgId, data) => new Promise((res, rej) => dispatch(createTransfer(orgId, data, res, rej))),
  addFlashMessage:   (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default withRouter(connect(select, dispatcher)(NewTransaction));
