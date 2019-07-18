import * as React from 'react';

import { camelCase } from 'lodash';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import Scrollbars from 'react-custom-scrollbars';
// @ts-ignore
import DefaultLegendContent from 'recharts/lib/component/DefaultLegendContent';

import { COLORS } from 'constants/colors';
import { ICustomersByMonthsStatistic }
from 'services/statistic';
import { formatMoney, ICurrency, number2Money } from 'utils/money';

interface IProps {
  stats: ICustomersByMonthsStatistic;
}

class CustomersByMonthsStatisticChart extends React.PureComponent<IProps> {
  private valueFormatter = (currency: ICurrency) => {
    return (value: number) => formatMoney(number2Money(value, currency));
  }

  private renderScrollableLegend = (props: any) => (
    <Scrollbars
      style={ { width: 'fit-content' } }
      autoHide
      autoHideTimeout={ 1000 }
      autoHideDuration={ 200 }
      autoHeight
      autoHeightMax={ 64 }
    >
      <DefaultLegendContent { ...props } />
    </Scrollbars>
  )

  public renderBar = (key: string, idx: number) => {
    return (
      <Bar
        key={ `${key}` }
        stackId="month"
        dataKey={ camelCase(key) }
        name={ key }
        fill={ COLORS[idx % COLORS.length] }
      />
    );
  }

  public render() {
    const { stats } = this.props;

    return (
      <>
        <ResponsiveContainer height={ 300 } width="100%">
          <BarChart
            data={ stats.data }
          >
            <CartesianGrid strokeDasharray="3 3" vertical={ false } />
            <XAxis dataKey="month"/>
            <YAxis tickFormatter={ this.valueFormatter(stats.currency) } width={ 100 } />
            <Tooltip formatter={ this.valueFormatter(stats.currency) } />
            <Legend verticalAlign="top" content={ this.renderScrollableLegend } />
            { stats.header.map((key, idx) => this.renderBar(key, idx)) }
          </BarChart>
        </ResponsiveContainer>
      </>
    );
  }
}

export default CustomersByMonthsStatisticChart;
