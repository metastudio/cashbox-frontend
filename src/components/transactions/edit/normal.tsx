import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ID } from 'model-types';
import { addFlashMessage, AddFlashMessageAction } from 'services/flash-messages';
import {
  ITransaction, ITransactionParams,
  updateTransaction,
} from 'services/transactions';
import { CategoryType } from 'services/categories';
import { formatMoneyValue, formatMoneyParam } from 'utils/money';
import { prepareSubmissionError } from 'utils/errors';

import Form, { ITransactionFormData } from './../forms/normal';

interface IOwnProps {
  orgId:       ID;
  type:        CategoryType;
  transaction: ITransaction;
}

interface IDispatchProps {
  update: (orgId: ID, transactionID: ID, data: ITransactionParams) => Promise<ITransaction>;
  showMessage: AddFlashMessageAction;
}

type IRouterProps = RouteComponentProps<{}>;
type IProps = IOwnProps & IDispatchProps & IRouterProps;

class EditNormalTransaction extends React.PureComponent<IProps> {
  private handleSubmit = (values: ITransactionFormData) => {
    const { orgId, transaction, update } = this.props;
    return update(orgId, transaction.id, {
      amount:        formatMoneyParam(values.amount),
      categoryId:    values.categoryId,
      customerId:    values.customerId,
      bankAccountId: values.bankAccountId,
      comment:       values.comment,
      date:          values.date,
    }).catch(prepareSubmissionError);
  }

  private afterUpdate = () => {
    const { showMessage, history } = this.props;
    showMessage('Transaction successfully updated.');
    history.push('/transactions');
  }

  private initialData = (): ITransactionFormData => {
    const { transaction } = this.props;

    return ({
      amount:        formatMoneyValue(transaction.amount),
      categoryId:    transaction.category && transaction.category.id,
      customerId:    transaction.customer && transaction.customer.id,
      bankAccountId: transaction.bankAccount && transaction.bankAccount.id,
      comment:       transaction.comment,
      date:          transaction.date,
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
  update: (orgId, tId, data) => new Promise((res, rej) => dispatch(updateTransaction(orgId, tId, data, res, rej))),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter<IOwnProps & IRouterProps>(
  connect<{}, IDispatchProps, IOwnProps>(undefined, mapDispatch)(EditNormalTransaction),
);
