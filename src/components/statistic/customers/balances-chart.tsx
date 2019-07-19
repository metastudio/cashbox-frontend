import * as React from 'react';

import {
  Bar,
  CartesianGrid,
  ComposedChart,
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
import { ICustomersBalancesStatistic } from 'services/statistic';
import { formatMoney, ICurrency, number2Money } from 'utils/money';

interface IProps {
  stats: ICustomersBalancesStatistic;
}

class CustomersBalancesStatisticChart extends React.PureComponent<IProps> {
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
      autoHeightMax={ 400 }
    >
      <DefaultLegendContent { ...props } />
    </Scrollbars>
  )

  public render() {
    const { stats } = this.props;

    return (
      <>
        <ResponsiveContainer height={ 300 } width="100%">
          <ComposedChart
            data={ stats.data }
          >
            <CartesianGrid strokeDasharray="3 3" vertical={ false } />
            <XAxis dataKey="name"/>
            <YAxis tickFormatter={ this.valueFormatter(stats.currency) } width={ 100 }/>
            <Tooltip formatter={ this.valueFormatter(stats.currency) } />
            <Legend verticalAlign="top" content={ this.renderScrollableLegend } />
            <Bar dataKey="income" fill={ COLORS[0] } name="Income" />
            <Bar dataKey="expense" fill={ COLORS[1] } name="Expense" />
          </ComposedChart>
        </ResponsiveContainer>
      </>
    );
  }
}

export default CustomersBalancesStatisticChart;
