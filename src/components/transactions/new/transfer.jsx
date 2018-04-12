import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { addFlashMessage } from 'actions/flash-messages.js';
import { createTransfer } from 'actions/transactions.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { prepareSubmissionError } from 'utils/errors';

import TransferForm from './../transfer-form.jsx'

class NewTransfer extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterCreate  = this.afterCreate.bind(this)
  }

  handleSubmit(values) {
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
    this.props.addFlashMessage('Transfer successfully created.');
    this.props.history.push('/transactions');
  }

  render() {
    return(
      <div>
        <TransferForm onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterCreate } orgId={ this.props.orgId } />
      </div>
    )
  }
}

NewTransfer.propTypes = {
  orgId:              PropTypes.number.isRequired,
  createTransfer:     PropTypes.func.isRequired,
  addFlashMessage:    PropTypes.func.isRequired,
  history:            PropTypes.object.isRequired
}

const select = (state) => ({
  orgId: getCurrentOrganizationId(state),
})

const dispatcher = (dispatch) => ({
  createTransfer:  (orgId, data) => new Promise((res, rej) => dispatch(createTransfer(orgId, data, res, rej))),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default withRouter(connect(select, dispatcher)(NewTransfer));
