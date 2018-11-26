import * as React from 'react';

import { Location } from 'history';
import { Nav, NavItem } from 'react-bootstrap';
import { match, Redirect } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import { PERIODS } from 'constants/periods';
import { selectStatisticsQueryPeriod } from 'services/statistic';

interface IProps {
  location: Location;
}

class BalanceTabs extends React.Component<IProps> {
  private isTabActive = (tab: string): ((_match: match<{}>, location: Location) => boolean) => {
    return (_match: match<{}>, location: Location) => {
      return location.search === `?period=${tab}`;
    };
  }

  private renderPeriods = (pathname: string) => {
    return PERIODS.map(({ value, label }) => (
      <LinkContainer
        key={ value }
        to={ { pathname, search: `period=${value}` } }
        isActive={ this.isTabActive(value) }
      >
        <NavItem>{ label }</NavItem>
      </LinkContainer>
    ));
  }

  public render() {
    const { location: { pathname, search } } = this.props;

    const period = selectStatisticsQueryPeriod(search);

    if (!period) {
      return <Redirect to={ { pathname, search: `period=${PERIODS[0].value}` } } />;
    }

    return (
      <Nav bsStyle="tabs">
        { this.renderPeriods(pathname) }
      </Nav>
    );
  }
}

export default BalanceTabs;
