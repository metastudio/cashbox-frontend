import * as React from 'react';

import { Checkbox } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID } from 'model-types';
import { CategoryType } from 'services/categories';
import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import {
  createTransaction,
  ITransaction,
  ITransactionsFilter,
  selectTransactionsQueryFilter,
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

interface IStateProps {
  filter: ITransactionsFilter;
}

interface IDispatchProps {
  create:      typeof createTransaction.request;
  showMessage: typeof addFlashMessage;
}

type IRouteProps = RouteComponentProps<{}>;
type IProps = IOwnProps & IStateProps & IDispatchProps & IRouteProps;

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
    return new Promise((resolve, reject) => {
      create(
        orgId,
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
    const { copyTransaction, filter } = this.props;

    const values = {
      date: formatDateValue(new Date()),
    };

    if (copyTransaction) {
      return {
        ...values,
        amount:        formatMoneyValue(copyTransaction.amount),
        categoryId:    copyTransaction.category && copyTransaction.category.id,
        customerId:    copyTransaction.customer && copyTransaction.customer.id,
        bankAccountId: copyTransaction.bankAccount && copyTransaction.bankAccount.id,
        comment:       copyTransaction.comment,
      };
    }

    return {
      bankAccountId: filter.bankAccountIdIn && filter.bankAccountIdIn[0],
      customerId:    filter.customerIdIn && filter.customerIdIn[0],
      categoryId:    filter.categoryIdIn && filter.categoryIdIn[0],
      ...values,
    };
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

const mapState = (state: IGlobalState, { location }: IRouteProps): IStateProps => ({
  filter: selectTransactionsQueryFilter(location.search),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  create: (orgId, data, res, rej) => dispatch(createTransaction.request(orgId, data, res, rej)),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter<IOwnProps & IRouteProps>(
  connect<IStateProps, IDispatchProps, IRouteProps>(mapState, mapDispatch)(NewExpenseTransaction),
);
