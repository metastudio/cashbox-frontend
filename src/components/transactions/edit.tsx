import * as React from 'react';

import { Modal } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ITransaction } from 'services/transactions';

import { ICurrentOrgIdProps, withCurrentOrgId } from 'components/organizations/current-organization';
import Spinner from 'components/utils/spinner';
import Buttons from './edit/buttons';
import Tabs from './edit/tabs';
import TransactionProvider from './providers/transaction';

type IProps = RouteComponentProps<{ id: string }> & ICurrentOrgIdProps;

class EditTransaction extends React.PureComponent<IProps> {
  private handleClose = () => {
    const { location: { search } } = this.props;
    this.props.history.push({ search, pathname: '/transactions' });
  }

  private renderContent = (transaction: ITransaction) => {
    const { orgId } = this.props;

    return (
      <>
        <Modal.Body>
          <Tabs orgId={ orgId } transaction={ transaction } />
        </Modal.Body>
        <Modal.Footer>
          <Buttons transaction={ transaction } onCancel={ this.handleClose } />
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
