import * as React from 'react';

import { PageHeader } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { IPagination } from 'model-types';
import { balanceStatisticPath } from 'routes';
import { IBalanceStatistic } from 'services/statistic';

import { ICurrentOrgIdProps, withCurrentOrgId } from 'components/organizations/current-organization';
import { SimplePaginator } from 'components/utils/paginator';
import Chart from './chart';
import Provider from './provider';
import Tabs from './tabs';

type IProps = RouteComponentProps<{}> & ICurrentOrgIdProps;

class BalanceStatisticPage extends React.PureComponent<IProps> {
  private renderPagination = (pagination: IPagination) => {
    return (
      <SimplePaginator
        data={ pagination }
        inverse
        prevPageLabel="← Back"
        nextPageLabel="Forward →"
      />
    );
  }

  private renderContent = (balances: IBalanceStatistic, pagination: IPagination | null) => {
    return (
      <>
        <Chart balances={ balances } />
        { pagination && this.renderPagination(pagination) }
      </>
    );
  }

  public render() {
    const { location } = this.props;

    return (
      <>
        <BreadcrumbsItem to={ balanceStatisticPath() }>
          Balance
        </BreadcrumbsItem>
        <PageHeader>
          Balance
        </PageHeader>
        <Tabs location={ location } />
        <Provider orgId={ this.props.orgId } search={ location.search }>
          { this.renderContent }
        </Provider>
      </>
    );
  }
}

export default withRouter(withCurrentOrgId<IProps>(BalanceStatisticPage));
