import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ITransaction } from 'services/transactions';

import { withCurrentOrgId, ICurrentOrgIdProps } from 'components/organizations/current-organization';
import TransactionProvider from './providers/transaction';
import Tabs from './edit/tabs';
import Buttons from './edit/buttons';
import Spinner from 'components/utils/spinner';

type IProps = RouteComponentProps<{ id: string }> & ICurrentOrgIdProps;

class EditTransaction extends React.PureComponent<IProps> {
  private handleClose = () => {
    this.props.history.push('/transactions');
  }

  private renderContent = (transaction: ITransaction) => {
    const { orgId } = this.props;

    return (
      <>
        <Modal.Body>
          <Tabs orgId={ orgId } transaction={ transaction } />
        </Modal.Body>
        <Modal.Footer>
          <Buttons transaction={ transaction } />
        </Modal.Footer>
      </>
    );
  }

  private renderSpinner = () => (
    <Modal.Body>
      <Spinner />
    </Modal.Body>
  )

  public render() {
    const { orgId, match: { params } } = this.props;

    return(
      <Modal show onHide={ this.handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Edit Transaction</Modal.Title>
        </Modal.Header>
        <TransactionProvider orgId={ orgId } transactionId={ Number(params.id) } spinner={ this.renderSpinner }>
          { this.renderContent }
        </TransactionProvider>
      </Modal>
    );
  }
}

export default withRouter(withCurrentOrgId(EditTransaction));
