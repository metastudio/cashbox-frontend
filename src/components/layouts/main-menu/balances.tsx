import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';
import { IMoney, formatMoney } from 'utils/money';

import { selectCurrentOrganizationId } from 'services/organizations';
import {
  IBalance,
  loadOrganizationBalances,
  selectBalancesTotalAmount, selectBalancesDefaultCurrency, selectBalancesTotals,
} from 'services/balances';

import BalanceItem from './balance-item';

interface IStateProps {
  organizationId?:  number;
  totalAmount?:     IMoney;
  defaultCurrency?: string;
  balances:         IBalance[];
}

interface IDispatchProps {
  loadData: (organizationId: number) => void;
}

class Balances extends React.Component<IStateProps & IDispatchProps> {
  // private balanceTitle = (balance: IBalance): string => {
  //   if (!balance.rate) {
  //     return '';
  //   }

  //   const { defaultCurrency } = this.props;

  //   return `${ balance.currency }/${ defaultCurrency }, `
  //     + `rate: ${ balance.rate }, `
  //     + `by: ${ moment(balance.updatedAt).format('L') }`;
  // }

  public componentDidMount() {
    const { organizationId, loadData } = this.props;
    if (organizationId) {
      loadData(organizationId);
    }
  }

  public render() {
    const { organizationId, totalAmount, balances, defaultCurrency } = this.props;

    if (!organizationId || !totalAmount) { return null; }

    return (
      <NavDropdown title={ 'Total: ' + formatMoney(totalAmount) } id="balances-nav-dropdown">
        { balances.map((b, i) => <BalanceItem key={ i } balance={ b } defaultCurrency={ defaultCurrency } />) }
      </NavDropdown>
    );
  }
}

const mapState = (state: object) => ({
  organizationId:  selectCurrentOrganizationId(state),
  totalAmount:     selectBalancesTotalAmount(state),
  defaultCurrency: selectBalancesDefaultCurrency(state),
  balances:        selectBalancesTotals(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  loadData: (organizationId: number) => dispatch(loadOrganizationBalances(organizationId)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(Balances);
