import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Modal, Button, Row, Col } from 'react-bootstrap';

import { addFlashMessage } from 'actions/flash-messages.js';
import { createTransaction } from 'actions/transactions.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { prepareSubmissionError } from 'utils/errors';

import Form from './form.jsx'

class NewTransaction extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterCreate  = this.afterCreate.bind(this)

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
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

  afterCreate() {
    this.props.addFlashMessage('Transaction successfully created.');
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
            <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterCreate } orgId={ this.props.orgId } />
          </Modal.Body>
        </Modal>
      </div>
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
  createTransaction: (orgId, data) => new Promise((res, rej) => dispatch(createTransaction(orgId, data, res, rej))),
  addFlashMessage:   (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default withRouter(connect(select, dispatcher)(NewTransaction));
