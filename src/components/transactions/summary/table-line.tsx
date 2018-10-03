import * as React from 'react';

import { ITransactionsSummaryLine } from 'services/transactions-summary';

import { MoneyAmount } from 'components/utils/money';

interface IProps {
  title:        string;
  summaryLine?: ITransactionsSummaryLine;
}

const TransactionsSummaryTableLine: React.SFC<IProps> = ({ title, summaryLine }) => {
  if (!summaryLine) {
    return null;
  }

  return (
    <tr>
      <td>{ title }</td>
      <td className="text-right"><MoneyAmount amount={ summaryLine.income } colorize /></td>
      <td className="text-right"><MoneyAmount amount={ summaryLine.expense } colorize /></td>
      <td className="text-right"><MoneyAmount amount={ summaryLine.difference } colorize /></td>
    </tr>
  );
};

export default TransactionsSummaryTableLine;
