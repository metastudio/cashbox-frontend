import * as React from 'react';

import { Location } from 'history';
import { Nav, NavItem } from 'react-bootstrap';
import { match, Redirect } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { selectStatisticsQueryPeriod } from 'services/statistic';

interface IProps {
  location: Location;
}

const PERIODS = [
  { value: 'current-month',   label: 'Current month'   },
  { value: 'last-month',      label: 'Last month'      },
  { value: 'last-3-months',   label: 'Last 3 months'   },
  { value: 'current-quarter', label: 'Current quarter' },
  { value: 'last-quarter',    label: 'Last quarter'    },
  { value: 'current-year',    label: 'Current year'    },
  { value: 'last-year',       label: 'Last year'       },
];

class BalanceTabs extends React.Component<IProps> {
  private isTabActive = (tab: string): ((_match: match<{}>, location: Location) => boolean) => {
    return (_match: match<{}>, location: Location) => {
      return location.search === `?period=${tab}`;
    };
  }

  // private isCurrentMonthTabActive = (_match: match<{}>, location: Location) => (
  //   this.isTabActive(location, 'current-month')
  // )
  // private isLastMonthTabActive = (_match: match<{}>, location: Location) => (
  //   this.isTabActive(location, 'last-month')
  // )

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
