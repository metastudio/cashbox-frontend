import * as React from 'react';
import { Modal, Clearfix } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ITransaction } from 'services/transactions';

import { withCurrentOrgId, ICurrentOrgIdProps } from 'components/organizations/current-organization';
import LoadedTransaction from './loaded-transaction';
import Tabs from './edit/tabs';

type IProps = RouteComponentProps<{ id: string }> & ICurrentOrgIdProps;

class EditTransaction extends React.PureComponent<IProps> {
  private handleClose = () => {
    this.props.history.push('/transactions');
  }

  private renderContent = (transaction: ITransaction) => {
    const { orgId } = this.props;

    return <Tabs orgId={ orgId } transaction={ transaction } />;
  }

  public render() {
    const { orgId, match: { params } } = this.props;

    return(
      <Modal show onHide={ this.handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Edit Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoadedTransaction orgId={ orgId } transactionId={ Number(params.id) }>
            { this.renderContent }
          </LoadedTransaction>
          <Clearfix />
        </Modal.Body>
      </Modal>
    );
  }
}

export default withRouter(withCurrentOrgId(EditTransaction));
