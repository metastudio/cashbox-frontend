import * as React from 'react';

import { connect, Dispatch } from 'react-redux';
import * as moment from 'moment';
import { NavDropdown } from 'react-bootstrap';

import { loadOrganizationBalances } from 'actions/balances.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import {
  selectBalancesTotalAmount,
  selectBalancesDefaultCurrency,
  selectBalancesTotals
} from 'selectors/balances.js';

import BalanceItem, { Balance } from './balance-item';

interface StateProps {
  organizationId?:  number;
  totalAmount?:     string;
  defaultCurrency?: string;
  balances:         Balance[];
}

interface DispatchProps {
  loadData: (organizationId: number) => void;
}

class Balances extends React.Component<StateProps & DispatchProps> {
  componentDidMount() {
    const { organizationId, loadData } = this.props;
    if (organizationId) {
      loadData(organizationId);
    }
  }

  balanceTitle = (balance: Balance): string => {
    if (!balance.rate) {
      return '';
    }

    const { defaultCurrency } = this.props;

    return `${ balance.currency }/${ defaultCurrency }, `
      + `rate: ${ balance.rate }, `
      + `by: ${ moment(balance.updatedAt).format('L') }`;
  }

  render() {
    const { organizationId, totalAmount, balances, defaultCurrency } = this.props;

    if (!organizationId || !totalAmount) { return null; }

    return (
      <NavDropdown title={ 'Total: ' + totalAmount } id="balances-nav-dropdown">
        { balances.map((b, i) => <BalanceItem key={ i } balance={ b } defaultCurrency={ defaultCurrency } />) }
      </NavDropdown>
    );
  }
}

const mapState = (state: object) => ({
  organizationId:  getCurrentOrganizationId(state),
  totalAmount:     selectBalancesTotalAmount(state),
  defaultCurrency: selectBalancesDefaultCurrency(state),
  balances:        selectBalancesTotals(state),
});

const mapDispatch = (dispatch: Dispatch<void>) => ({
  loadData: (organizationId: number) => dispatch(loadOrganizationBalances(organizationId)),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(Balances);