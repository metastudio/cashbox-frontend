import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Table } from 'react-bootstrap';

import { selectCurrentOrganizationId } from 'services/organizations/selectors.js';
import { loadDebtors } from 'services/debtors/actions.js';
import { Debtor } from 'services/debtors/types';
import {
  selectDebtors,
  selectTotal,
  selectTotalsByCurrency,
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
  totalsByCurrency: Summ[] | null;
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
    if ( !this.props.debtors || !this.props.totalsByCurrency ) {
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

    const renderTotalsByCurrency = this.props.totalsByCurrency.map((summ) => (
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
            { renderTotalsByCurrency }
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
    totalsByCurrency: selectTotalsByCurrency(state),
  });
};

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => dispatch(loadDebtors(orgId)),
});

export default connect(mapState, mapDispatch)(DebtorSidebar);
