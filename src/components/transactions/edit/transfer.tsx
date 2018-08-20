import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { formatMoneyValue, formatMoneyParam } from 'utils/money';
import { addFlashMessage, AddFlashMessageAction } from 'services/flash-messages';
import {
  ITransfer, ITransferParams,
  updateTransaction,
} from 'services/transactions';
import { formatDateValue } from 'utils/date';
import { prepareSubmissionError } from 'utils/errors';

import TransferForm, { ITransferFormData } from './../forms/transfer';
import { ID } from 'model-types';

interface IOwnProps {
  orgId:    ID;
  transfer: ITransfer;
}

interface IDispatchProps {
  update: (orgId: ID, transferId: ID, data: ITransferParams) => Promise<ITransfer>;
  showMessage: AddFlashMessageAction;
}

type IRouteProps = RouteComponentProps<{}>;
type IProps = IOwnProps & IDispatchProps & IRouteProps;

class EditTransfer extends React.PureComponent<IProps> {
  private handleSubmit = (values: ITransferFormData) => {
    const { orgId, transfer, update } = this.props;
    return update(orgId, transfer.id, {
      amount:  formatMoneyParam(values.toAmount),
      comment: values.comment,
      date:    values.date,
    }).catch(prepareSubmissionError);
  }

  private afterUpdate = () => {
    const { showMessage, history } = this.props;

    showMessage('Transfer successfully updated.');
    history.push('/transactions');
  }

  private initialData = (tranfer: ITransfer): ITransferFormData => {
    return ({
      toAmount:          formatMoneyValue(tranfer.amount),
      fromAmount:        formatMoneyValue(tranfer.transferOut.amount),
      toBankAccountId:   tranfer.bankAccount.id,
      fromBankAccountId: tranfer.transferOut.bankAccount.id,
      comment:           tranfer.comment,
      date:              formatDateValue(tranfer.date),
    });
  }

  public render() {
    const { transfer } = this.props;

    return(
      <TransferForm
        onSubmit={ this.handleSubmit }
        onSubmitSuccess={ this.afterUpdate }
        initialValues={ this.initialData(transfer) }
        action="Update"
        transfer={ transfer }
      />
    );
  }
}

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  update: (orgId, transferId, data) => (
    new Promise((res, rej) => dispatch(updateTransaction(orgId, transferId, data, res, rej)))
  ),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter<IOwnProps & IRouteProps>(
  connect<{}, IDispatchProps, IOwnProps>(undefined, mapDispatch)(EditTransfer),
);
