import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Table } from 'react-bootstrap';

import { selectCurrentOrganizationId } from 'services/organizations/selectors.js';
import { loadDebtors } from 'services/debtors/actions.js';
import { Debtor } from 'services/debtors/types';
import {
  selectDebtors,
  selectTotal,
  selectSummByCurrencies,
} from 'services/debtors/selectors.js';
import { formatMoney, Money } from 'utils/money';
import ConvertedDebt from './converted-debt';

interface Summ {
  name: string;
  amount: Money;
}

interface StateProps {
  orgId: number;
  debtors: Debtor[] | null;
  total: Money | null;
  summByCurrencies: Summ[] | null;
}

interface DispatchProps {
  load: (orgId: number) => void;
}

type Props = StateProps & DispatchProps;

class DebtorSidebar extends React.Component<Props> {
  componentDidMount() {
    const { orgId, load } = this.props;
    load(orgId);
  }

  render() {
    if ( !this.props.debtors || !this.props.summByCurrencies ) {
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

    const renderSummByCurrencies = this.props.summByCurrencies.map((summ) => (
      <tr key={ summ.name }>
        <td>{ summ.name }</td>
        <td className="text-right">
          { formatMoney(summ.amount) }
        </td>
      </tr>
    ));

    const renderTotal = () => {
      const total = this.props.total;
      if ( total === null) { return null; }
      return(
        <thead>
          <tr>
            <th>Total</th>
            <th className="text-right">
              { formatMoney(total) }
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
            { renderSummByCurrencies }
          </tbody>
          { renderTotal() }
        </Table>
      </>
    );
  }
}

const mapState = (state: {}) => {
  return({
    orgId:            selectCurrentOrganizationId(state),
    debtors:          selectDebtors(state),
    total:            selectTotal(state),
    summByCurrencies: selectSummByCurrencies(state),
  });
};

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => dispatch(loadDebtors(orgId)),
});

export default connect(mapState, mapDispatch)(DebtorSidebar);
