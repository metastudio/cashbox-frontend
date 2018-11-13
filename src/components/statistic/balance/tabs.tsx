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
    return location.search === `?scale=${tab}`;
  }

  private isMonthsTabActive   = (_match: match<{}>, location: Location) => this.isTabActive(location, 'months');
  private isQuartersTabActive = (_match: match<{}>, location: Location) => this.isTabActive(location, 'quarters');
  private isYearsTabActive    = (_match: match<{}>, location: Location) => this.isTabActive(location, 'years');

  public render() {
    const { location: { pathname, search } } = this.props;

    const scale = selectStatisticsQueryScale(search);

    if (!scale) {
      return <Redirect to={ { pathname, search: 'scale=months' } } />;
    }

    return (
      <Nav bsStyle="tabs">
        <LinkContainer to={ { pathname, search: 'scale=months' } } isActive={ this.isMonthsTabActive }>
          <NavItem>Months</NavItem>
        </LinkContainer>
        <LinkContainer to={ { pathname, search: 'scale=quarters' } } isActive={ this.isQuartersTabActive }>
          <NavItem>Quarters</NavItem>
        </LinkContainer>
        <LinkContainer to={ { pathname, search: 'scale=years' } } isActive={ this.isYearsTabActive }>
          <NavItem>Years</NavItem>
        </LinkContainer>
      </Nav>
    );
  }
}

export default BalanceTabs;
