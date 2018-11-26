import * as React from 'react';

import { Location } from 'history';
import { Nav, NavItem } from 'react-bootstrap';
import { match, Redirect } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { selectStatisticsQueryScale } from 'services/statistic';

interface IProps {
  location: Location;
}

class BalanceTabs extends React.Component<IProps> {
  private isTabActive = (location: Location, tab: string): boolean => {
    return location.search === `?period=${tab}`;
  }

  private isCurrentMonthTabActive = (_match: match<{}>, location: Location) => this.isTabActive(location, 'months');

  public render() {
    const { location: { pathname, search } } = this.props;

    const scale = selectStatisticsQueryScale(search);

    if (!scale) {
      return <Redirect to={ { pathname, search: 'scale=months' } } />;
    }

    return (
      <Nav bsStyle="tabs">
        <LinkContainer to={ { pathname, search: 'period=months' } } isActive={ this.isCurrentMonthTabActive }>
          <NavItem>Current month</NavItem>
        </LinkContainer>
      </Nav>
    );
  }
}

export default BalanceTabs;
