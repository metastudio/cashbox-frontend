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
import { ICategoriesStatistic } from 'services/statistic';
import { formatMoney, ICurrency, number2Money } from 'utils/money';

interface IProps {
  stats: ICategoriesStatistic;
}

interface IPieProps {
  cx:          number;
  cy:          number;
  midAngle:    number;
  innerRadius: number;
  outerRadius: number;
  percent:     number;
}

class CategoriesStatisticChart extends React.PureComponent<IProps> {
  private valueFormatter = (currency: ICurrency) => {
    return (value: number) => formatMoney(number2Money(value, currency));
  }

  private renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: IPieProps) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={ x } y={ y } fill="white" textAnchor={ x > cx ? 'start' : 'end' } dominantBaseline="central">
        { `${(percent * 100).toFixed(0)}%` }
      </text>
    );
  }

  public render() {
    const { stats } = this.props;

    return (
      <>
        <ResponsiveContainer height={ 400 } width="100%">
          <PieChart>
            <Pie
              animationBegin={ 100 }
              animationDuration={ 1000 }
              data={ stats.data }
              dataKey="value"
              labelLine={ false }
              label={ this.renderCustomizedLabel }
            >
              { stats.data.map((_entry, idx) => <Cell key={ idx } fill={ COLORS[idx % COLORS.length] }/>) }
            </Pie>
            <Tooltip formatter={ this.valueFormatter(stats.currency) } />
            <Legend layout="vertical" verticalAlign="top" align="left" />
          </PieChart>
        </ResponsiveContainer>
      </>
    );
  }
}

export default CategoriesStatisticChart;
