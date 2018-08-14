import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ID } from 'model-types';
import { addFlashMessage, AddFlashMessageAction } from 'services/flash-messages';
import {
  ITransfer, ITransferParams,
  createTransfer,
} from 'services/transactions';
import { formatDateValue } from 'utils/date';
import { formatMoneyParam, formatMoneyValue } from 'utils/money';
import { prepareSubmissionError } from 'utils/errors';

import TransferForm, { ITransferFormData } from './../forms/transfer';

interface IOwnProps {
  orgId:         ID;
  copyTransfer?: ITransfer;
}

interface IDispatchProps {
  create: (orgId: ID, data: ITransferParams) => Promise<ITransfer>;
  showMessage: AddFlashMessageAction;
}

type IRouteProps = RouteComponentProps<{}>;
type IProps = IOwnProps & IDispatchProps & IRouteProps;

class NewTransfer extends React.PureComponent<IProps> {
  private handleSubmit = (values: ITransferFormData) => {
    const { orgId, create } = this.props;
    return create(orgId, {
      bankAccountId: values.fromBankAccountId,
      amount:        formatMoneyParam(values.toAmount),
      referenceId:   values.toBankAccountId,
      exchangeRate:  values.exchangeRate,
      comission:     formatMoneyParam(values.comission),
      comment:       values.comment,
      date:          values.date,
    }).catch(prepareSubmissionError);
  }

  private afterCreate = () => {
    const { showMessage, history } = this.props;
    showMessage('Transfer successfully created.');
    history.push('/transactions');
  }

  private initialValues = (): ITransferFormData => {
    const { copyTransfer } = this.props;

    const values = {
      date: formatDateValue(new Date()),
    };

    if (!copyTransfer) {
      return values;
    }

    return ({
      ...values,
      toAmount:          formatMoneyValue(copyTransfer.amount),
      fromAmount:        formatMoneyValue(copyTransfer.transferOut.amount),
      toBankAccountId:   copyTransfer.bankAccount.id,
      fromBankAccountId: copyTransfer.transferOut.bankAccount.id,
    });
  }

  public render() {
    return(
      <TransferForm
        onSubmit={ this.handleSubmit }
        onSubmitSuccess={ this.afterCreate }
        action="Create"
        initialValues={ this.initialValues() }
      />
    );
  }
}

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  create:      (orgId, data) => new Promise((res, rej) => dispatch(createTransfer(orgId, data, res, rej))),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter<IOwnProps & IRouteProps>(
  connect<{}, IDispatchProps, IOwnProps>(undefined, mapDispatch)(NewTransfer),
);
