import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Table } from 'react-bootstrap';

import { selectCurrentOrganizationId } from 'services/organizations/selectors.js';
import {
  selectDebtors,
  selectTotal,
  selectTotalsByCurrency,
  selectDebtorsStatus,
  Debtor,
  TotalByCurrency,
  loadDebtors,
} from 'services/debtors';
import { Status } from 'model-types';
import { Money } from 'utils/money';
import LoadingView from 'components/utils/loading-view';

import Debtors from './debtors';
import Total from './total';
import TotalsByCurrency from './totals_by_currency';

interface StateProps {
  orgId: number;
  debtors: Debtor[] | null;
  total: Money | null;
  totalsByCurrency: TotalByCurrency[] | null;
  status: string;
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
    const { status, debtors, totalsByCurrency, total } = this.props;

    if (status !== Status.Success || !debtors) {
      return <LoadingView status={ status } />;
    }

    if (!debtors) {
      return(<p>No debtors</p>);
    }

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
            <Debtors debtors={ debtors } />
            <TotalsByCurrency totals={ totalsByCurrency } />
          </tbody>
          <Total total={ total } />
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
    status:           selectDebtorsStatus(state),
  });
};

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => dispatch(loadDebtors(orgId)),
});

export default connect(mapState, mapDispatch)(DebtorSidebar);