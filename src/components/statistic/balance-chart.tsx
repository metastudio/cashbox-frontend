import * as React from 'react';

import { PageHeader } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { RouteComponentProps, withRouter } from 'react-router-dom';
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

import { IPagination } from 'model-types';
import { balanceStatisticPath } from 'routes';
import { IBalanceStatistic } from 'services/statistic';
import { formatMoney, ICurrency, number2Money } from 'utils/money';

import { ICurrentOrgIdProps, withCurrentOrgId } from 'components/organizations/current-organization';
import { SimplePaginator } from 'components/utils/paginator';
import Provider from './providers/balance';

type IProps = RouteComponentProps<{}> & ICurrentOrgIdProps;

class BalanceChart extends React.PureComponent<IProps> {
  private valueFormatter = (currency: ICurrency) => {
    return (value: number) => formatMoney(number2Money(value, currency));
  }
  private renderContent = (balances: IBalanceStatistic, pagination: IPagination | null) => {
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
        { pagination && <SimplePaginator data={ pagination } inverse /> }
      </>
    );
  }

  public render() {
    return (
      <>
        <BreadcrumbsItem to={ balanceStatisticPath() }>
          Balance
        </BreadcrumbsItem>
        <PageHeader>
          Balance
        </PageHeader>
        <Provider orgId={ this.props.orgId } search={ this.props.location.search }>
          { this.renderContent }
        </Provider>
      </>
    );
  }
}

export default withRouter(withCurrentOrgId<IProps>(BalanceChart));
