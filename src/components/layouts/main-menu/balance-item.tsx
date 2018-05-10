import * as React from 'react';
import * as moment from 'moment';
import { MenuItem } from 'react-bootstrap';
import { Money, formatMoney } from 'utils/money';

interface Balance {
  total:     Money;
  exTotal?:  Money;
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
      { formatMoney(balance.total) } { balance.exTotal ? '(' + formatMoney(balance.exTotal) + ')' : '' }
    </MenuItem>
  );
};

export { MenuBalanceItem as default, Balance };
