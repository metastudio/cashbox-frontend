import * as React from 'react';

import { Alert, Col, PageHeader, Row } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { customersStatisticPath } from 'routes';
import { ICustomersBalancesStatistic, ICustomersStatistic } from 'services/statistic';

import { ICurrentOrgIdProps, withCurrentOrgId } from 'components/organizations/current-organization';
import Tabs from '../period-tabs';
import BalancesChart from './balances-chart';
import Chart from './chart';

import BalancesByProvider from './balances-by-provider';
import ExpenseProvider from './expense-provider';
import IncomeProvider from './income-provider';
import TotalsByProvider from './totals-by-provider';

type IProps = RouteComponentProps<{}> & ICurrentOrgIdProps;

class CustomersStatisticPage extends React.PureComponent<IProps> {
  private renderChart = (stats: ICustomersStatistic) => {
    if (!stats || !stats.data || stats.data.length === 0) {
      return <Alert bsStyle="info">No data</Alert>;
    }

    return <Chart stats={ stats } />;
  }

  private renderBalancesChart = (stats: ICustomersBalancesStatistic) => {
    if (!stats || !stats.data || stats.data.length === 0) {
      return <Alert bsStyle="info">No data</Alert>;
    }

    return <BalancesChart stats={ stats } />;
  }

  public render() {
    const { location, orgId } = this.props;

    return (
      <>
        <BreadcrumbsItem to={ customersStatisticPath() }>
          Customers
        </BreadcrumbsItem>
        <PageHeader>
          Customers
        </PageHeader>
        <Tabs location={ location } />
        <Row>
          <Col xs={ 12 } sm={ 6 }>
            <h4 className="text-center">Income</h4>
            <IncomeProvider orgId={ orgId } search={ location.search }>
              { this.renderChart }
            </IncomeProvider>
          </Col>
          <Col xs={ 12 } sm={ 6 }>
            <h4 className="text-center">Expense</h4>
            <ExpenseProvider orgId={ orgId } search={ location.search }>
              { this.renderChart }
            </ExpenseProvider>
          </Col>
          <Col xs={ 12 } sm={ 12 }>
            <h4 className="text-center">Totals</h4>
            <TotalsByProvider orgId={ orgId } search={ location.search }>
              { this.renderChart }
            </TotalsByProvider>
          </Col>
          <Col xs={ 12 } sm={ 12 }>
            <h4 className="text-center">Balances</h4>
            <BalancesByProvider orgId={ orgId } search={ location.search }>
              { this.renderBalancesChart }
            </BalancesByProvider>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(withCurrentOrgId<IProps>(CustomersStatisticPage));
