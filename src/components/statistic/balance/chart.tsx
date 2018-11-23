import * as React from 'react';

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

import { IBalanceStatistic } from 'services/statistic';
import { formatMoney, ICurrency, number2Money } from 'utils/money';

interface IProps {
  balances: IBalanceStatistic;
}

class BalanceStatisticChart extends React.PureComponent<IProps> {
  private valueFormatter = (currency: ICurrency) => {
    return (value: number) => formatMoney(number2Money(value, currency));
  }

  public render() {
    const { balances } = this.props;

    return (
      <>
        <ResponsiveContainer height={ 300 } width="100%">
          <ComposedChart
            data={ balances.data }
          >
            <CartesianGrid strokeDasharray="3 3" vertical={ false } />
            <XAxis dataKey="month"/>
            <YAxis tickFormatter={ this.valueFormatter(balances.currency) } width={ 100 }/>
            <Tooltip formatter={ this.valueFormatter(balances.currency) } />
            <Legend verticalAlign="top" />
            <Bar dataKey="income" fill="#3366cc" name="Income" />
            <Bar dataKey="expense" fill="#dc3912" name="Expense" />
            <Line dataKey="total" stroke="#ff7300" name="Total" />
          </ComposedChart>
        </ResponsiveContainer>
      </>
    );
  }
}

export default BalanceStatisticChart;
