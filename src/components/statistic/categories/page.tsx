import * as React from 'react';

import { PageHeader } from 'react-bootstrap';
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
    return (
      <>
        <IncomeChart incomeStats={ incomeStats } />
      </>
    );
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
        <IncomeProvider orgId={ orgId } search={ location.search }>
          { this.renderContent }
        </IncomeProvider>
      </>
    );
  }
}

export default withRouter(withCurrentOrgId<IProps>(CategoriesStatisticPage));
