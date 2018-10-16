import * as React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID } from 'model-types';
import { addFlashMessage } from 'services/flash-messages';
import { ITransfer, updateTransaction } from 'services/transactions';
import { formatDateValue } from 'utils/date';
import { prepareSubmissionError } from 'utils/errors';
import { formatMoneyParam, formatMoneyValue } from 'utils/money';

import TransferForm, { ITransferFormData } from './../forms/transfer';

interface IOwnProps {
  orgId:    ID;
  transfer: ITransfer;
}

interface IDispatchProps {
  update: typeof updateTransaction.request;
  showMessage: typeof addFlashMessage;
}

type IRouteProps = RouteComponentProps<{}>;
type IProps = IOwnProps & IDispatchProps & IRouteProps;

class EditTransfer extends React.PureComponent<IProps> {
  private handleSubmit = (values: ITransferFormData) => {
    const { orgId, transfer, update } = this.props;
    return new Promise((resolve, reject) => {
      update(
        orgId,
        transfer.id,
        {
          amount:  formatMoneyParam(values.toAmount),
          comment: values.comment,
          date:    values.date,
          transferOutAttributes: {
            id:     transfer.transferOut.id,
            amount: formatMoneyParam(values.fromAmount),
          },
        },
        resolve,
        reject,
      );
    }).catch(prepareSubmissionError);
  }

  private afterUpdate = () => {
    const { showMessage, history, location: { search } } = this.props;

    showMessage('Transfer successfully updated.');
    history.push({ search, pathname: '/transactions' });
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
  update: (orgId, transId, data, res, rej) => dispatch(updateTransaction.request(orgId, transId, data, res, rej)),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter<IOwnProps & IRouteProps>(
  connect<{}, IDispatchProps, IOwnProps>(undefined, mapDispatch)(EditTransfer),
);
