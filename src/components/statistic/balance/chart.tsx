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

import { COLORS } from 'constants/colors';
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
            <Bar dataKey="income" fill={ COLORS[0] } name="Income" />
            <Bar dataKey="expense" fill={ COLORS[1] } name="Expense" />
            <Line dataKey="total" stroke={ COLORS[2] } name="Total" />
          </ComposedChart>
        </ResponsiveContainer>
      </>
    );
  }
}

export default BalanceStatisticChart;
