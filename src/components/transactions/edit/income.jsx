import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { formatMoneyValue, formatMoneyParam } from 'utils/money';
import { addFlashMessage } from 'services/flash-messages';
import {
  updateTransaction, clearTransaction,
  selectTransaction,
} from 'services/transactions';
import { selectCurrentOrganizationId } from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';

import Form from './../form/form.jsx';

class EditIncomeTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterUpdate  = this.afterUpdate.bind(this);
  }

  initialPrepare = (transaction) => {
    return ({
      amount:        formatMoneyValue(transaction.amount),
      categoryId:    transaction.category && transaction.category.id,
      customerId:    transaction.customer && transaction.customer.id,
      bankAccountId: transaction.bankAccount && transaction.bankAccount.id,
      comment:       transaction.comment,
      date:          transaction.date,
    });
  }

  handleSubmit(values) {
    const { orgId, transaction, updateTransaction } = this.props;
    return updateTransaction(orgId, transaction.id, {
      amount:        formatMoneyParam(values.amount),
      categoryId:    values.categoryId,
      customerId:    values.customerId,
      bankAccountId: values.bankAccountId,
      comment:       values.comment,
      date:          values.date,
    }).catch(prepareSubmissionError);
  }

  afterUpdate() {
    this.props.clearTransaction();
    this.props.addFlashMessage('Transaction successfully updated.');
    this.props.history.push('/transactions');
  }

  render() {
    const { orgId, transaction } = this.props;

    if (!transaction) {
      return null;
    }

    return(
      <Form
        onSubmit={ this.handleSubmit }
        onSubmitSuccess={ this.afterUpdate }
        orgId={ orgId }
        type="Income"
        initialValues={ this.initialPrepare(transaction) }
        action="Update"
        transaction={ transaction }
      />
    );
  }
}

EditIncomeTransaction.propTypes = {
  orgId:             PropTypes.number.isRequired,
  updateTransaction: PropTypes.func.isRequired,
  addFlashMessage:   PropTypes.func.isRequired,
  history:           PropTypes.object.isRequired,
  clearTransaction:  PropTypes.func.isRequired,
};

const select = (state) => ({
  orgId: selectCurrentOrganizationId(state),
  transaction: selectTransaction(state),
});

const dispatcher = (dispatch) => ({
  updateTransaction: (orgId, transactionId, data) => new Promise((res, rej) => dispatch(updateTransaction(orgId, transactionId, data, res, rej))),
  addFlashMessage:   (message, type = null) => dispatch(addFlashMessage(message, type)),
  clearTransaction:  () => dispatch(clearTransaction()),
});

export default withRouter(connect(select, dispatcher)(EditIncomeTransaction));
