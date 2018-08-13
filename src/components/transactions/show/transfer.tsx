import * as React from 'react';

import { formatBankAccountName } from 'services/bank-accounts';
import { ITransfer } from 'services/transactions';
import { formatDate } from 'utils/date';
import { formatMoney } from 'utils/money';

import TransferForm, { ITransferShowFormData } from './transfer-form';

interface IProps {
  transfer: ITransfer;
}

class ShowTransfer extends React.PureComponent<IProps> {
  private initialValues = (): ITransferShowFormData => {
    const { transfer } = this.props;

    return ({
      amount:        formatMoney(transfer.amount),
      fromAmount:    transfer.transferOut && formatMoney(transfer.transferOut.amount),
      category:      transfer.category && transfer.category.name,
      reference:     transfer.bankAccount && formatBankAccountName(transfer.bankAccount),
      bankAccount:   transfer.transferOut && formatBankAccountName(transfer.transferOut.bankAccount),
      comment:       transfer.comment,
      date:          formatDate(transfer.date),
    });
  }

  public render() {
    return(
      <TransferForm initialValues={ this.initialValues() } />
    );
  }
}

export default ShowTransfer;
