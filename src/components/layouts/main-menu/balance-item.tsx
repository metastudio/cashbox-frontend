import * as React from 'react';

import * as moment from 'moment';
import { MenuItem } from 'react-bootstrap';

import { IBalance } from 'services/balances';

import { MoneyAmount } from 'components/utils/money';

interface IProps {
  balance:          IBalance;
  defaultCurrency: string | null;
}

const MenuBalanceItem: React.SFC<IProps> = ({ balance, defaultCurrency }) => {
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

export default MenuBalanceItem;
