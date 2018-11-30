import * as React from 'react';

import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { IExpenseCategoriesStatistic } from 'services/statistic';
import { formatMoney, ICurrency, number2Money } from 'utils/money';

interface IProps {
  expenseStats: IExpenseCategoriesStatistic;
}

class ExpenseCategoriesStatisticChart extends React.PureComponent<IProps> {
  private valueFormatter = (currency: ICurrency) => {
    return (value: number) => formatMoney(number2Money(value, currency));
  }

  public render() {
    const { expenseStats } = this.props;

    return (
      <>
        <ResponsiveContainer height={ 300 } width="100%">
          <PieChart>
            <Pie data={ expenseStats.data } dataKey="value" label fill="#8884d8" />
            <Tooltip formatter={ this.valueFormatter(expenseStats.currency) } />
          </PieChart>
        </ResponsiveContainer>
      </>
    );
  }
}

export default ExpenseCategoriesStatisticChart;
