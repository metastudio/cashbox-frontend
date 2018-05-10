import * as React from 'react';

import { Transaction, Member } from 'model-types';

import Row from './table-row';

interface Props {
  transactions: Transaction[];
  currentMember: Member;
}

const TransactionsTableBody: React.SFC<Props> = ({ transactions, currentMember }) => (
  <tbody>
    { transactions.map((t) => <Row transaction={ t } key={ t.id } currentMember={ currentMember } />) }
  </tbody>
);

export default TransactionsTableBody;
