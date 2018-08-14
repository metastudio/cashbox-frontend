import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { CategoryType } from 'services/categories';
import { ID } from 'model-types';
import { addFlashMessage, AddFlashMessageAction } from 'services/flash-messages';
import {
  ITransaction, ITransactionParams,
  createTransaction,
} from 'services/transactions';
import { formatDateValue } from 'utils/date';
import { formatMoneyParam, formatMoneyValue } from 'utils/money';
import { prepareSubmissionError } from 'utils/errors';

import Form, { ITransactionFormData } from './../forms/normal';

interface IOwnProps {
  orgId:            ID;
  type:             CategoryType;
  copyTransaction?: ITransaction;
}

interface IDispatchProps {
  create: (orgId: ID, data: ITransactionParams) => Promise<ITransaction>;
  showMessage: AddFlashMessageAction;
}

type IRouteProps = RouteComponentProps<{}>;
type IProps = IOwnProps & IDispatchProps & IRouteProps;

class NewExpenseTransaction extends React.PureComponent<IProps> {
  private handleSubmit = (values: ITransactionFormData) => {
    const { orgId, create } = this.props;
    return create(orgId, {
      amount:        formatMoneyParam(values.amount),
      categoryId:    values.categoryId,
      customerId:    values.customerId,
      bankAccountId: values.bankAccountId,
      comment:       values.comment,
      date:          values.date,
    }).catch(prepareSubmissionError);
  }

  private afterCreate = () => {
    const { showMessage, history } = this.props;
    showMessage('Transaction successfully created.');
    history.push('/transactions');
  }

  private initialValues = (): ITransactionFormData => {
    const { copyTransaction } = this.props;

    const values = {
      date: formatDateValue(new Date()),
    };

    if (!copyTransaction) {
      return values;
    }

    return ({
      ...values,
      amount:        formatMoneyValue(copyTransaction.amount),
      categoryId:    copyTransaction.category && copyTransaction.category.id,
      customerId:    copyTransaction.customer && copyTransaction.customer.id,
      bankAccountId: copyTransaction.bankAccount && copyTransaction.bankAccount.id,
      comment:       copyTransaction.comment,
    });
  }

  public render() {
    return(
      <Form
        onSubmit={ this.handleSubmit }
        onSubmitSuccess={ this.afterCreate }
        type={ this.props.type }
        initialValues={ this.initialValues() }
        action="Create"
      />
    );
  }
}

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  create: (orgId, data) => new Promise((res, rej) => dispatch(createTransaction(orgId, data, res, rej))),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter<IOwnProps & IRouteProps>(
  connect<{}, IDispatchProps, IOwnProps>(undefined, mapDispatch)(NewExpenseTransaction),
);
