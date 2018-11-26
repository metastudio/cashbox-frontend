import * as React from 'react';

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { COLORS } from 'constants/colors';
import { IIncomeCategoriesStatistic } from 'services/statistic';
import { formatMoney, ICurrency, number2Money } from 'utils/money';

interface IProps {
  incomeStats: IIncomeCategoriesStatistic;
}

class IncomeCategoriesStatisticChart extends React.PureComponent<IProps> {
  private valueFormatter = (currency: ICurrency) => {
    return (value: number) => formatMoney(number2Money(value, currency));
  }

  private labelFormatter = (currency: ICurrency) => {
    return (data: { payload: { value?: number } }) => formatMoney(number2Money(data.payload.value, currency));
  }

  public render() {
    const { incomeStats } = this.props;

    return (
      <>
        <ResponsiveContainer height={ 300 } width="100%">
          <PieChart>
            <Pie
              animationBegin={ 100 }
              animationDuration={ 1000 }
              data={ incomeStats.data }
              dataKey="value"
              label={ this.labelFormatter(incomeStats.currency) }
            >
              { incomeStats.data.map((_entry, idx) => <Cell key={ idx } fill={ COLORS[idx % COLORS.length] }/>) }
            </Pie>
            <Tooltip formatter={ this.valueFormatter(incomeStats.currency) } />
            <Legend verticalAlign="top" />
          </PieChart>
        </ResponsiveContainer>
      </>
    );
  }
}

export default IncomeCategoriesStatisticChart;
