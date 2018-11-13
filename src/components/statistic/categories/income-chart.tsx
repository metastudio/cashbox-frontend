import * as React from 'react';

import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { IIncomeCategoriesStatistic } from 'services/statistic';
import { formatMoney, ICurrency, number2Money } from 'utils/money';

interface IProps {
  incomeStats: IIncomeCategoriesStatistic;
}

class IncomeCategoriesStatisticChart extends React.PureComponent<IProps> {
  private valueFormatter = (currency: ICurrency) => {
    return (value: number) => formatMoney(number2Money(value, currency));
  }

  public render() {
    const { incomeStats } = this.props;

    return (
      <>
        <ResponsiveContainer height={ 300 } width="100%">
          <PieChart>
            <Pie data={ incomeStats.data } dataKey="value" label fill="#8884d8" />
            <Tooltip formatter={ this.valueFormatter(incomeStats.currency) } />
          </PieChart>
        </ResponsiveContainer>
      </>
    );
  }
}

export default IncomeCategoriesStatisticChart;
