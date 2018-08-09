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
import { selectCurrentOrganizationId } from 'services/organizations';
import { formatMoneyParam } from 'utils/money';
import { prepareSubmissionError } from 'utils/errors';

import Form, { ITransactionFormData } from './../forms/normal';

interface IOwnProps {
  type: CategoryType;
}

interface IStateProps {
  orgId: ID;
}

interface IDispatchProps {
  create: (orgId: ID, data: ITransactionParams) => Promise<ITransaction>;
  showMessage: AddFlashMessageAction;
}

type IRouteProps = RouteComponentProps<{}>;
type IProps = IOwnProps & IStateProps & IDispatchProps & IRouteProps;

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

  public render() {
    return(
      <Form
        onSubmit={ this.handleSubmit }
        onSubmitSuccess={ this.afterCreate }
        type={ this.props.type }
        action="Create"
      />
    );
  }
}

const mapState = (state: {}): IStateProps => ({
  orgId: selectCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  create: (orgId, data) => new Promise((res, rej) => dispatch(createTransaction(orgId, data, res, rej))),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter<IOwnProps & IRouteProps>(
  connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(NewExpenseTransaction),
);
