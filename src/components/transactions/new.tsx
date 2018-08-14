import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as QS from 'query-string';

import { ITransaction } from 'services/transactions';

import { withCurrentOrgId, ICurrentOrgIdProps } from 'components/organizations/current-organization';
import TransactionProvider from './providers/transaction';
import Tabs from './new/tabs';
import Spinner from 'components/utils/spinner';

type IProps = RouteComponentProps<{ id: string }> & ICurrentOrgIdProps;

class NewTransaction extends React.PureComponent<IProps> {
  private handleClose = () => {
    this.props.history.push('/transactions');
  }

  private renderContent = (transaction?: ITransaction) => {
    const { orgId } = this.props;

    return (
      <Modal.Body>
        <Tabs orgId={ orgId } copyTransaction={ transaction } />
      </Modal.Body>
    );
  }

  private renderSpinner = () => (
    <Modal.Body>
      <Spinner />
    </Modal.Body>
  )

  private renderLoadTransaction = () => {
    const { orgId, location: { search } } = this.props;
    const query = QS.parse(search);

    if (!query.copyId) {
      return this.renderContent();
    }

    return (
      <TransactionProvider
        orgId={ orgId }
        transactionId={ Number(query.copyId) }
        spinner={ this.renderSpinner }
      >
        { this.renderContent }
      </TransactionProvider>
    );
  }

  public render() {
    return(
      <Modal show onHide={ this.handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>New Transaction</Modal.Title>
        </Modal.Header>
        { this.renderLoadTransaction() }
      </Modal>
    );
  }
}

export default withRouter(withCurrentOrgId(NewTransaction));
