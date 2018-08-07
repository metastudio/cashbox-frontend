import * as React from 'react';
import * as moment from 'moment';
import { MenuItem } from 'react-bootstrap';
import { Money } from 'utils/money';

import { MoneyAmount } from 'components/utils/money';

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

  const exTotal = () => {
    if (!balance.exTotal) { return null; }

    return (
      <> (<MoneyAmount amount={ balance.exTotal } />) </>
    );
  };

  return (
    <MenuItem title={ balanceTitle() }>
      <MoneyAmount amount={ balance.total } />
      { exTotal() }
    </MenuItem>
  );
};

export { MenuBalanceItem as default, Balance };
