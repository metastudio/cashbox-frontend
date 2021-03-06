import * as React from 'react';

import { Modal } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ITransaction } from 'services/transactions';

import { ICurrentOrgIdProps, withCurrentOrgId } from 'components/organizations/current-organization';
import Spinner from 'components/utils/spinner';
import TransactionProvider from './providers/transaction';
import Buttons from './show/buttons';
import Tabs from './show/tabs';

type IProps = RouteComponentProps<{ id: string }> & ICurrentOrgIdProps;

class ShowTransaction extends React.PureComponent<IProps> {
  private handleClose = () => {
    const { location: { search } } = this.props;
    this.props.history.push({ search, pathname: '/transactions' });
  }

  private renderContent = (transaction: ITransaction) => {
    return (
      <>
        <Modal.Body>
          <Tabs transaction={ transaction } />
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
          <Modal.Title>Transaction</Modal.Title>
        </Modal.Header>
        <TransactionProvider orgId={ orgId } transactionId={ Number(params.id) } spinner={ this.renderSpinner }>
          { this.renderContent }
        </TransactionProvider>
      </Modal>
    );
  }
}

export default withRouter(withCurrentOrgId(ShowTransaction));
