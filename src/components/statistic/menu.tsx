import * as React from 'react';

import { Nav, NavItem, PageHeader } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { balanceStatisticPath, categoriesStatisticPath, customersStatisticPath } from 'routes';

type IProps = RouteComponentProps<{}>;

class StatisticMenu extends React.PureComponent<IProps> {
  public render() {
    const { location: { search } } = this.props;

    return (
      <>
        <PageHeader>Charts</PageHeader>
        <Nav bsStyle="pills" stacked>
          <LinkContainer exact to={ balanceStatisticPath() }>
            <NavItem eventKey={ 1 }>
              Balance
            </NavItem>
          </LinkContainer>
          <LinkContainer exact to={ { search, pathname: categoriesStatisticPath() } }>
            <NavItem eventKey={ 1 }>
              Categories
            </NavItem>
          </LinkContainer>
          <LinkContainer exact to={ { search, pathname: customersStatisticPath() } }>
            <NavItem eventKey={ 1 }>
              Customers
            </NavItem>
          </LinkContainer>
        </Nav>
      </>
    );
  }
}

export default withRouter(StatisticMenu);
