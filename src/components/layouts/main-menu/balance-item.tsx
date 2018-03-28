import * as React from 'react';
import * as moment from 'moment';
import { MenuItem } from 'react-bootstrap';

interface Balance {
  total:     number;
  exTotal?:  number;
  rate:      string;
  currency:  string;
  updatedAt: Date;
}

interface Props {
  balance:          Balance;
  defaultCurrency?: string;
}

const MenuBalanceItem: React.SFC<Props> = ({ balance, defaultCurrency }) => {
  const balanceTitle = (): string => {
    if (!balance.rate) {
      return '';
    }

    return `${ balance.currency }/${ defaultCurrency }, `
      + `rate: ${ balance.rate }, `
      + `by: ${ moment(balance.updatedAt).format('L') }`;
  };

  return (
    <MenuItem title={ balanceTitle() }>
      { balance.total } { balance.exTotal ? '(' + balance.exTotal + ')' : '' }
    </MenuItem>
  );
};

export { MenuBalanceItem as default, Balance };
