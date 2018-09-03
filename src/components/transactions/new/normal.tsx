import * as React from 'react';

import { Checkbox } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID } from 'model-types';
import { CategoryType } from 'services/categories';
import { addFlashMessage, AddFlashMessageAction } from 'services/flash-messages';
import {
  createTransaction,
  ITransaction,
  ITransactionParams,
} from 'services/transactions';
import { formatDateValue } from 'utils/date';
import { prepareSubmissionError } from 'utils/errors';
import { formatMoneyParam, formatMoneyValue } from 'utils/money';

import { locationWithoutKey } from 'utils/url-helpers';
import Form, { ITransactionFormData } from '../forms/normal';

interface IOwnProps {
  orgId:            ID;
  type:             CategoryType;
  copyTransaction?: ITransaction;
}

interface IState {
  leaveOpen: boolean;
}

interface IDispatchProps {
  create: (orgId: ID, data: ITransactionParams) => Promise<ITransaction>;
  showMessage: AddFlashMessageAction;
}

type IRouteProps = RouteComponentProps<{}>;
type IProps = IOwnProps & IDispatchProps & IRouteProps;

class NewExpenseTransaction extends React.PureComponent<IProps, IState> {
  public readonly state: IState = {
    leaveOpen: false,
  };

  private handleLeaveOpenChange = (e: React.FormEvent<Checkbox>) => {
    // react-bootstrap has bad type definitions for onChange handlers
    const event = (e as any as React.ChangeEvent<HTMLInputElement>);

    this.setState({ leaveOpen: event.target.checked });
  }

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
    const { showMessage, history, location: { search } } = this.props;
    showMessage('Transaction successfully created.');

    if (!this.state.leaveOpen) {
      history.push(locationWithoutKey(
        {
          search,
          pathname: '/transactions',
        },
        'copyId',
      ));
    }
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
        leaveOpenValue={ this.state.leaveOpen }
        onLeaveOpenChange={ this.handleLeaveOpenChange }
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
