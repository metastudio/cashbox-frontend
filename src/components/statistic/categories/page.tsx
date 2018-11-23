import * as React from 'react';

import { PageHeader } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { categoriesStatisticPath } from 'routes';
import { IIncomeCategoriesStatistic } from 'services/statistic';
import { ICurrency } from 'utils/money';

import { ICurrentOrgIdProps, withCurrentOrgId } from 'components/organizations/current-organization';
import IncomeChart from './income-chart';
// import IncomeProvider from './income-provider';
import Tabs from './tabs';

type IProps = RouteComponentProps<{}> & ICurrentOrgIdProps;

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

const currency: ICurrency = {
  isoCode:       'RUB',
  name:          'Russian Ruble',
  symbol:        '₽',
  subunitToUnit: 100,
};

class CategoriesStatisticPage extends React.PureComponent<IProps> {
  private renderContent = (incomeStats: IIncomeCategoriesStatistic) => {
    return (
      <>
        <IncomeChart incomeStats={ incomeStats } />
      </>
    );
  }

  public render() {
    const { location } = this.props;

    return (
      <>
        <BreadcrumbsItem to={ categoriesStatisticPath() }>
          Categories
        </BreadcrumbsItem>
        <PageHeader>
          Categories
        </PageHeader>
        <Tabs location={ location } />
        { this.renderContent({ data, currency }) }
      </>
    );
  }
}

export default withRouter(withCurrentOrgId<IProps>(CategoriesStatisticPage));
