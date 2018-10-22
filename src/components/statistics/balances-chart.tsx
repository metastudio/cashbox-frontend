import * as React from 'react';

import { PageHeader } from 'react-bootstrap';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { formatMoney, ICurrency, number2Money } from 'utils/money';

const data = [
  { month: 'Oct, 2017', income: 219.69,     expense: 4237.2,     total: 4021675.26 },
  { month: 'Nov, 2017', income: 1657758.21, expense: 855682.28,  total: 4760066.2 },
  { month: 'Dec, 2017', income: 3284038.4,  expense: 3826822.79, total: 4036113.79 },
  { month: 'Jan, 2018', income: 899972.4,   expense: 474274.58,  total: 4425904.52 },
  { month: 'Feb, 2018', income: 2167554.16, expense: 1658942.81, total: 4790282.1 },
  { month: 'Mar, 2018', income: 1235303.44, expense: 844623.75,  total: 5095809.16 },
  { month: 'Apr, 2018', income: 1247253.23, expense: 2789278.06, total: 3424972.33 },
  { month: 'May, 2018', income: 763684.62,  expense: 813864.33,  total: 3353994.62 },
  { month: 'Jun, 2018', income: 756505.07,  expense: 782961.68,  total: 3295102.15 },
  { month: 'Jul, 2018', income: 607108.91,  expense: 1392354.98, total: 2461848.08 },
  { month: 'Aug, 2018', income: 634346.47,  expense: 963925.84,  total: 2123228.69 },
  { month: 'Sep, 2018', income: 864254.29,  expense: 620992.47,  total: 2373647.9 },
  { month: 'Oct, 2018', income: 807146.68,  expense: 1103860.3,  total: 2072477.28 },
];

const rubCurrency: ICurrency = {
  isoCode:       'RUB',
  name:          'Russian Ruble',
  symbol:        '₽',
  subunitToUnit: 100,
};

function valueFormatter(value: number): string | undefined {
  return formatMoney(number2Money(value, rubCurrency));
}

const BalancesChart: React.SFC = () => {
  return (
    <>
      <PageHeader>
        Balances
      </PageHeader>
      <ResponsiveContainer height={ 300 } width="100%">
        <ComposedChart
          data={ data }
        >
          <CartesianGrid strokeDasharray="3 3" vertical={ false } />
          <XAxis dataKey="month"/>
          <YAxis tickFormatter={ valueFormatter } width={ 100 }/>
          <Tooltip formatter={ valueFormatter } />
          <Legend verticalAlign="top" />
          <Bar dataKey="income" fill="#3366cc" name="Income" />
          <Bar dataKey="expense" fill="#dc3912" name="Expense" />
          <Line dataKey="total" stroke="#ff7300" name="Total" />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default BalancesChart;
