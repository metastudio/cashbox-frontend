import * as React from 'react';
import { Modal, Tabs, Tab, Button } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { ITransaction, ITransfer } from 'services/transactions';

import { withCurrentOrgId, ICurrentOrgIdProps } from 'components/organizations/current-organization';
import LoadedTransaction from './loaded-transaction';
import ShowNormal from './show/normal';
import ShowTransfer from './show/transfer';
import Destroy from './destroy';
import Spinner from 'components/utils/spinner';

type IProps = RouteComponentProps<{ id: string }> & ICurrentOrgIdProps;

class ShowTransaction extends React.PureComponent<IProps> {
  private handleClose = () => {
    this.props.history.push('/transactions');
  }

  private renderTransferTab = (transaction: ITransfer) => (
    <Tab eventKey={ 1 } title="Transfer">
      <ShowTransfer transfer={ transaction } />
    </Tab>
  )

  private renderNormalTab = (transaction: ITransaction) => (
    <Tab eventKey={ 1 } title={ transaction.category.type }>
      <ShowNormal transaction={ transaction } />
    </Tab>
  )

  private renderTab = (transaction: ITransaction) => {
    if (transaction.category.name === 'Transfer') {
      return this.renderTransferTab(transaction);
    }

    return this.renderNormalTab(transaction);
  }

  private renderButtons = (transaction: ITransaction) => {
    return (
      <>
        <span className="pull-left">
          <Destroy transaction={ transaction } />
          <LinkContainer to={ `/transactions/${transaction.id}/edit` }>
            <Button>Edit</Button>
          </LinkContainer>
        </span>

        <LinkContainer exact to={ '/transactions' }>
          <Button>Close</Button>
        </LinkContainer>
      </>
    );
  }

  private renderContent = (transaction: ITransaction) => {
    return (
      <>
        <Modal.Body>
          <Tabs defaultActiveKey={ 1 } id="transactionType">
            { this.renderTab(transaction) }
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          { this.renderButtons(transaction) }
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
        <LoadedTransaction orgId={ orgId } transactionId={ Number(params.id) } spinner={ this.renderSpinner }>
          { this.renderContent }
        </LoadedTransaction>
      </Modal>
    );
  }
}

export default withRouter(withCurrentOrgId(ShowTransaction));
