import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { formatMoneyValue, formatMoneyParam } from 'utils/money';
import { addFlashMessage } from 'services/flash-messages';
import { updateTransaction, clearTransaction } from 'actions/transactions.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectTransaction } from 'selectors/transactions.js';
import { prepareSubmissionError } from 'utils/errors';

import TransferForm from './../form/transfer-form.jsx';

class EditTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterUpdate  = this.afterUpdate.bind(this);
  }

  initialPrepare = (transaction) => {
    return ({
      amount:        formatMoneyValue(transaction.amount),
      fromAmount:    transaction.transferOut && formatMoneyValue(transaction.transferOut.amount),
      categoryName:  transaction.category && transaction.category.name,
      referenceId:   transaction.bankAccount && transaction.bankAccount.id,
      bankAccountId: transaction.transferOut && transaction.transferOut.bankAccount.id,
      comment:       transaction.comment,
      date:          transaction.date,
    });
  }

  handleSubmit(values) {
    const { orgId, transaction, updateTransaction } = this.props;
    return updateTransaction(orgId, transaction.id, {
      amount:  formatMoneyParam(values.amount),
      comment: values.comment,
      date:    values.date,
    }).catch(prepareSubmissionError);
  }

  afterUpdate() {
    this.props.clearTransaction();
    this.props.addFlashMessage('Transfer successfully updated.');
    this.props.history.push('/transactions');
  }

  render() {
    const { orgId, transaction } = this.props;

    if (!transaction) {
      return null;
    }

    return(
      <TransferForm
        onSubmit={ this.handleSubmit }
        onSubmitSuccess={ this.afterUpdate }
        orgId={ orgId }
        initialValues={ this.initialPrepare(transaction) }
        action="Update"
        transaction={ transaction }
      />
    );
  }
}

EditTransfer.propTypes = {
  orgId:             PropTypes.number.isRequired,
  updateTransaction: PropTypes.func.isRequired,
  addFlashMessage:   PropTypes.func.isRequired,
  history:           PropTypes.object.isRequired,
  transaction:       PropTypes.object,
  clearTransaction:  PropTypes.func.isRequired,
};

const select = (state) => ({
  orgId: getCurrentOrganizationId(state),
  transaction: selectTransaction(state),
});

const dispatcher = (dispatch) => ({
  updateTransaction: (orgId, transactionId, data) => new Promise((res, rej) => dispatch(updateTransaction(orgId, transactionId, data, res, rej))),
  addFlashMessage:   (message, type = null) => dispatch(addFlashMessage(message, type)),
  clearTransaction:  () => dispatch(clearTransaction()),
});

export default withRouter(connect(select, dispatcher)(EditTransfer));
