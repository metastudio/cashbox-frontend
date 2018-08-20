import * as React from 'react';

import { formatBankAccountName } from 'services/bank-accounts';
import { ITransaction } from 'services/transactions';
import { formatDate } from 'utils/date';
import { formatMoney } from 'utils/money';

import { HorizontalStaticField } from 'components/utils/static-field';

interface IProps {
  transaction: ITransaction;
}

const ShowNormalTransaction: React.SFC<IProps> = ({ transaction }) => (
  <div className="form-horizontal">
    <HorizontalStaticField label="Amount" value={ formatMoney(transaction.amount) } />
    <HorizontalStaticField label="Category" value={ transaction.category && transaction.category.name } />
    <HorizontalStaticField label="Customer" value={ transaction.customer && transaction.customer.name } />
    <HorizontalStaticField
      label="Bank account"
      value={ transaction.bankAccount && formatBankAccountName(transaction.bankAccount) }
    />
    <HorizontalStaticField label="Comment" value={ transaction.comment } />
    <HorizontalStaticField label="Date" value={ formatDate(transaction.date) } />
  </div>
);

export default ShowNormalTransaction;
