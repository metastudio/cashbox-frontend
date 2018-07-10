import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { groupBy, filter } from 'lodash';

import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { loadDebtors } from 'actions/debtors.js';
import { loadCurrenciesRates } from 'actions/currencies.js';
import { Debtor, ExchangedDebtor } from 'model-types';
import { selectDebtors } from 'selectors/debtors.js';
import { formatMoney, sumMoney, Money } from 'utils/money';
import ConvertedDebt from './converted-debt';

interface StateProps {
  orgId: number;
  debtors: Debtor[] | null;
}

interface DispatchProps {
  load: (orgId: number) => void;
  loadRates: () => void;
}

type Props = StateProps & DispatchProps;

class DebtorSidebar extends React.Component<Props> {
  componentDidMount() {
    const { orgId, load, loadRates } = this.props;
    load(orgId);
    loadRates();
  }

  render() {
    if ( this.props.debtors === null ) {
      return(<p>No debtors</p>);
    }

    const debtorRender = (debtor: Debtor) => {
      if (debtor.amount.amount) {
        return(<ConvertedDebt debtor={ debtor } />);
      } else {
        return(
          <td className="text-right">
            { formatMoney(debtor.amount.oldAmount) }
          </td>
        );
      }
    };

    const debtors = this.props.debtors.map((debtor, index) => (
      <tr key={ index }>
        <td>{ debtor.name }</td>
        { debtorRender(debtor) }
      </tr>
    ));

    const debtorsWithDefaultCurrencies = filter(this.props.debtors, (debtor) => !debtor.amount.amount );

    const debtorsWithoutDefaultCurrencies = filter(this.props.debtors, (debtor) => debtor.amount.amount );

    const reducer = (summ: Money | 0, debtor: Debtor) => (
      sumMoney(summ, debtor.amount.oldAmount)
    );

    const totalReducer = (summ: Money | 0, debtor: Debtor) => (
      sumMoney(summ, debtor.amount.total)
    );

    const allWithDefaultCurrencies = () => {
      if (this.props.debtors === null) { return null; }
      if (!debtorsWithDefaultCurrencies) { return null; }
      const aa = debtorsWithDefaultCurrencies.reduce(reducer, 0);
      return(
        <tr>
          <td>All customers</td>
          <td className="text-right">{
            aa ? formatMoney(aa) : 0
          }</td>
        </tr>
      );
    };

    const allWithoutDefaultCurrencies = () => {
      if (this.props.debtors === null) { return null; }
      if (!debtorsWithoutDefaultCurrencies) { return null; }
      const bb = groupBy(
        debtorsWithoutDefaultCurrencies, (debtor: ExchangedDebtor) => debtor.amount.oldAmount.currency.isoCode );
      return Object.keys(bb).map((currency: string) => {
        const bbb = bb[currency].reduce(reducer, 0);
        return(
          <tr key={ currency } >
            <td>All customers ( { currency } )</td>
            <td className="text-right">{
              bbb ? formatMoney(bbb) : 0
            }</td>
          </tr>
        );
      });
    };

    const total = () => {
      if (this.props.debtors === null) { return null; }
      const totalSum: Money | 0 = this.props.debtors.reduce(totalReducer, 0);
      return(
        <thead>
          <tr>
            <th>Total</th>
            <th className="text-right">
              { totalSum === 0 ? 0 : formatMoney(totalSum) }
            </th>
          </tr>
        </thead>
      );
    };

    return(
      <>
        <h2>Debtor customers</h2>
        <Table striped responsive bordered id="bankAccounts">
          <thead>
            <tr>
              <th>Debtor</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            { debtors }
            { allWithDefaultCurrencies() }
            { allWithoutDefaultCurrencies() }
          </tbody>
          { total() }
        </Table>
      </>
    );
  }
}

const mapState = (state: {}) => {
  return({
    orgId: getCurrentOrganizationId(state),
    debtors: selectDebtors(state),
  });
};

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => dispatch(loadDebtors(orgId)),
  loadRates: () => dispatch(loadCurrenciesRates()),
});

export default connect(mapState, mapDispatch)(DebtorSidebar);
