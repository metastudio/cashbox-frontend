import * as React from 'react';

import { Alert, Col, PageHeader, Row } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { categoriesStatisticPath } from 'routes';
import { IIncomeCategoriesStatistic } from 'services/statistic';

import { ICurrentOrgIdProps, withCurrentOrgId } from 'components/organizations/current-organization';
import IncomeChart from './income-chart';
import IncomeProvider from './income-provider';
import Tabs from './tabs';

type IProps = RouteComponentProps<{}> & ICurrentOrgIdProps;

class CategoriesStatisticPage extends React.PureComponent<IProps> {
  private renderContent = (incomeStats: IIncomeCategoriesStatistic) => {
    if (!incomeStats || !incomeStats.data || incomeStats.data.length === 0) {
      return <Alert bsStyle="info">No data</Alert>;
    }

    return <IncomeChart incomeStats={ incomeStats } />;
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
            <IncomeProvider orgId={ orgId } search={ location.search }>
              { this.renderContent }
            </IncomeProvider>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(withCurrentOrgId<IProps>(CategoriesStatisticPage));
