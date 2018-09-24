import * as React from 'react';

import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Status } from 'model-types';
import {
  IDebtor,
  ITotalByCurrency,
  loadDebtors,
  selectDebtors,
  selectDebtorsStatus,
  selectTotal,
  selectTotalsByCurrency,
} from 'services/debtors';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';
import { IMoney } from 'utils/money';

import LoadingView from 'components/utils/loading-view';
import Debtors from './debtors';
import Total from './total';
import TotalsByCurrency from './totals_by_currency';

interface IStateProps {
  orgId:   number;
  status:  Status;
  debtors: IDebtor[] | null;
  total:   IMoney | null;
  totalsByCurrency: ITotalByCurrency[] | null;
}

interface IDispatchProps {
  load: (orgId: number) => void;
}

type IProps = IStateProps & IDispatchProps;

class DebtorSidebar extends React.PureComponent<IProps> {
  private loadData = () => {
    const { orgId, load } = this.props;
    load(orgId);
  }

  private renderContent = () => {
    const { debtors, totalsByCurrency, total } = this.props;

    if (!debtors) {
      return(<p>No debtors</p>);
    }

    return(
      <>
        <h2>Debtor customers</h2>
        <Table striped responsive id="debtors">
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

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate(oldProps: IProps) {
    if (this.props.status === Status.Invalid || this.props.orgId !== oldProps.orgId) {
      this.loadData();
    }
  }

  public render() {
    return (
      <LoadingView status={ this.props.status }>
        { this.renderContent }
      </LoadingView>
    );
  }
}

const mapState = (state: IGlobalState) => {
  return({
    orgId:            selectCurrentOrganizationId(state),
    debtors:          selectDebtors(state),
    total:            selectTotal(state),
    totalsByCurrency: selectTotalsByCurrency(state),
    status:           selectDebtorsStatus(state),
  });
};

const mapDispatch = (dispatch: Dispatch) => ({
  load: (orgId: number) => dispatch(loadDebtors(orgId)),
});

export default connect(mapState, mapDispatch)(DebtorSidebar);
