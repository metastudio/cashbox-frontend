import * as React from 'react';

import { formatBankAccountName } from 'services/bank-accounts';
import { ITransfer } from 'services/transactions';
import { formatDate } from 'utils/date';
import { formatMoney } from 'utils/money';

import { HorizontalStaticField } from 'components/utils/static-field';

interface IProps {
  transfer: ITransfer;
}

const ShowTransfer: React.SFC<IProps> = ({ transfer }) => {
  const bankAccount = (
    <>
      { formatBankAccountName(transfer.transferOut.bankAccount) }
      { ' ' }
      &rarr;
      { ' ' }
      { formatBankAccountName(transfer.bankAccount) }
    </>
  );

  return (
    <div className="form-horizontal">
      <HorizontalStaticField label="From Amount" value={ formatMoney(transfer.transferOut.amount) } />
      <HorizontalStaticField label="To Amount" value={ formatMoney(transfer.amount) } />
      <HorizontalStaticField label="BankAccount" value={ bankAccount }/>
      <HorizontalStaticField label="Comment" value={ transfer.comment } />
      <HorizontalStaticField label="Date" value={ formatDate(transfer.date) } />
    </div>
  );
};

export default ShowTransfer;
