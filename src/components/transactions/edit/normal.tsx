import * as React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID } from 'model-types';
import { CategoryType } from 'services/categories';
import { addFlashMessage } from 'services/flash-messages';
import { ITransaction, updateTransaction } from 'services/transactions';
import { formatDateValue } from 'utils/date';
import { prepareSubmissionError } from 'utils/errors';
import { formatMoneyParam, formatMoneyValue } from 'utils/money';

import Form, { ITransactionFormData } from './../forms/normal';

interface IOwnProps {
  orgId:       ID;
  type:        CategoryType;
  transaction: ITransaction;
}

interface IDispatchProps {
  update:      typeof updateTransaction.request;
  showMessage: typeof addFlashMessage;
}

type IRouterProps = RouteComponentProps<{}>;
type IProps = IOwnProps & IDispatchProps & IRouterProps;

class EditNormalTransaction extends React.PureComponent<IProps> {
  private handleSubmit = (values: ITransactionFormData) => {
    const { orgId, transaction, update } = this.props;
    return new Promise((resolve, reject) => {
      update(
        orgId,
        transaction.id,
        {
          amount:        formatMoneyParam(values.amount),
          categoryId:    values.categoryId,
          customerId:    values.customerId,
          bankAccountId: values.bankAccountId,
          comment:       values.comment,
          date:          values.date,
        },
        resolve,
        reject,
      );
    }).catch(prepareSubmissionError);
  }

  private afterUpdate = () => {
    const { showMessage, history, location: { search } } = this.props;
    showMessage('Transaction successfully updated.');
    history.push({ search, pathname: '/transactions' });
  }

  private initialData = (): ITransactionFormData => {
    const { transaction } = this.props;

    return ({
      amount:        formatMoneyValue(transaction.amount),
      categoryId:    transaction.category && transaction.category.id,
      customerId:    transaction.customer && transaction.customer.id,
      bankAccountId: transaction.bankAccount && transaction.bankAccount.id,
      comment:       transaction.comment,
      date:          formatDateValue(transaction.date),
    });
  }

  public render() {
    const { type } = this.props;

    return(
      <Form
        onSubmit={ this.handleSubmit }
        onSubmitSuccess={ this.afterUpdate }
        type={ type }
        initialValues={ this.initialData() }
        action="Update"
      />
    );
  }
}

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  update: (orgId, tId, data, res, rej) => dispatch(updateTransaction.request(orgId, tId, data, res, rej)),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter<IOwnProps & IRouterProps>(
  connect<{}, IDispatchProps, IOwnProps>(undefined, mapDispatch)(EditNormalTransaction),
);
