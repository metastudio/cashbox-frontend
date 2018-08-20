import * as React from 'react';

import { formatBankAccountName } from 'services/bank-accounts';
import { ITransaction } from 'services/transactions';
import { formatDate } from 'utils/date';
import { formatMoney } from 'utils/money';

import Form, { ITransactionShowFormData } from './normal-form';

interface IProps {
  transaction: ITransaction;
}

class ShowNormalTransaction extends React.PureComponent<IProps> {

  private initialValues = (): ITransactionShowFormData => {
    const { transaction } = this.props;

    return ({
      amount:      formatMoney(transaction.amount),
      category:    transaction.category && transaction.category.name,
      customer:    transaction.customer && transaction.customer.name,
      bankAccount: transaction.bankAccount && formatBankAccountName(transaction.bankAccount),
      comment:     transaction.comment,
      date:        formatDate(transaction.date),
    });
  }

  public render() {
    return(
      <Form initialValues={ this.initialValues() } />
    );
  }
}

export default ShowNormalTransaction;
