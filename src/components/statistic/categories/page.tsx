import * as React from 'react';

import { Alert, Col, PageHeader, Row } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { categoriesStatisticPath } from 'routes';
import { ICategoriesStatistic } from 'services/statistic';

import { ICurrentOrgIdProps, withCurrentOrgId } from 'components/organizations/current-organization';
import Tabs from '../period-tabs';
import Chart from './chart';
import ExpenseProvider from './expense-provider';
import IncomeProvider from './income-provider';

type IProps = RouteComponentProps<{}> & ICurrentOrgIdProps;

class CategoriesStatisticPage extends React.PureComponent<IProps> {
  private renderChart = (stats: ICategoriesStatistic) => {
    if (!stats || !stats.data || stats.data.length === 0) {
      return <Alert bsStyle="info">No data</Alert>;
    }

    return <Chart stats={ stats } />;
  }

  public render() {
    const { location, orgId } = this.props;

    return (
      <>
        <BreadcrumbsItem to={ categoriesStatisticPath() }>
          Categories
        </BreadcrumbsItem>
        <PageHeader>
          Categories
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
        </Row>
      </>
    );
  }
}

export default withRouter(withCurrentOrgId<IProps>(CategoriesStatisticPage));
