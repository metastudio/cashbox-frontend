import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';

import { Status } from 'model-types';
import { selectCurrentOrganizationId } from 'services/organizations';
import {
  loadBankAccounts,
  selectBankAccountsCurrencies,
  selectBankAccountsStatus,
} from 'services/bank-accounts';

import Table from './list/table';
import LoadingView from 'components/utils/loading-view';

interface IStateProps {
  orgId:      number;
  status:     Status;
  currencies: string[];
}

interface IDispatchProps {
  load: (orgId: number) => void;
}

type IProps = IStateProps & IDispatchProps;

class BankAccountsList extends React.Component<IProps> {
  private loadData = () => {
    const { orgId, load } = this.props;

    load(orgId);
  }

  public componentDidMount() {
    this.loadData();
  }

  public render() {
    const { status, currencies } = this.props;

    return (
      <>
        <PageHeader>
          <Link to="/bank_accounts/new" className="btn btn-default pull-right">Add Bank Account</Link>
          Bank Accounts
        </PageHeader>
        <LoadingView status={ status }>
          { () => currencies.map(c => <Table key={ c } currency={ c } />) }
        </LoadingView>
      </>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:      selectCurrentOrganizationId(state),
  status:     selectBankAccountsStatus(state),
  currencies: selectBankAccountsCurrencies(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  load: (orgId: number) => dispatch(loadBankAccounts(orgId)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(BankAccountsList);
