import * as React from 'react';
import { Link } from 'react-router-dom';

import { BankAccount } from 'services/bank-accounts';
import DestroyButton from '../destroy';

import { MoneyAmount } from 'components/utils/money';

interface Props {
  bankAccount: BankAccount;
}

const BankAccountsTableRow: React.SFC<Props> = ({ bankAccount }) => (
  <tr className={ bankAccount.visible ? '' : 'text-muted' }>
    <td>{ bankAccount.name }</td>
    <td>{ bankAccount.currency }</td>
    <td>{ bankAccount.description }</td>
    <td><MoneyAmount colorize="onlyNegative" amount={ bankAccount.balance } /></td>
    <td>{ bankAccount.invoiceDetails }</td>
    <td><Link to={ `/bank_accounts/${bankAccount.id}/edit` } title="Edit"><i className="fa fa-edit" /></Link></td>
    <td><DestroyButton bankAccount={ bankAccount } /></td>
  </tr>
);

export default BankAccountsTableRow;
