import * as React from 'react';

import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ID, Status } from 'model-types';
import {
  IBalance,
  loadOrganizationBalances,
  selectBalancesDefaultCurrency,
  selectBalancesStatus,
  selectBalancesTotalAmount,
  selectBalancesTotals,
} from 'services/balances';
import { selectCurrentOrganizationId } from 'services/organizations';
import { formatMoney, IMoney } from 'utils/money';

import BalanceItem from './balance-item';

interface IStateProps {
  orgId?:           ID;
  status:           Status;
  totalAmount?:     IMoney;
  defaultCurrency?: string;
  balances:         IBalance[];
}

interface IDispatchProps {
  load: (orgId: ID) => void;
}

class Balances extends React.Component<IStateProps & IDispatchProps> {
  private loadData = () => {
    const { orgId, load, status } = this.props;
    if (orgId && status === Status.Invalid) {
      load(orgId);
    }
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate() {
    this.loadData();
  }

  public render() {
    const { orgId, totalAmount, balances, defaultCurrency } = this.props;

    if (!orgId || !totalAmount) { return null; }

    return (
      <NavDropdown title={ `Total:  ${formatMoney(totalAmount)}` } id="balances-nav-dropdown">
        { balances.map((b, i) => <BalanceItem key={ i } balance={ b } defaultCurrency={ defaultCurrency } />) }
      </NavDropdown>
    );
  }
}

const mapState = (state: object): IStateProps => ({
  orgId:           selectCurrentOrganizationId(state),
  status:          selectBalancesStatus(state),
  totalAmount:     selectBalancesTotalAmount(state),
  defaultCurrency: selectBalancesDefaultCurrency(state),
  balances:        selectBalancesTotals(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: orgId => dispatch(loadOrganizationBalances(orgId)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(Balances);
