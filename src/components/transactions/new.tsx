import * as React from 'react';
import { Modal, Tabs, Tab, Clearfix } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { CategoryType } from 'services/categories';

import { withCurrentOrgId, ICurrentOrgIdProps } from 'components/organizations/current-organization';
import NewNormal   from './new/normal';
import NewTransfer from './new/transfer';

type IProps = RouteComponentProps<{ id: string }> & ICurrentOrgIdProps;

class NewTransaction extends React.PureComponent<IProps> {
  private handleClose = () => {
    this.props.history.push('/transactions');
  }

  public render() {
    const { orgId } = this.props;

    return(
      <Modal show onHide={ this.handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>New Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey={ 1 } mountOnEnter id="transactionType">
            <Tab eventKey={ 1 } title="Income">
              <NewNormal orgId={ orgId } type={ CategoryType.Income } />
            </Tab>
            <Tab eventKey={ 2 } title="Expense">
              <NewNormal orgId={ orgId } type={ CategoryType.Expense } />
            </Tab>
            <Tab eventKey={ 3 } title="Transfer">
              <NewTransfer />
            </Tab>
          </Tabs>
          <Clearfix />
        </Modal.Body>
      </Modal>
    );
  }
}

export default withRouter(withCurrentOrgId(NewTransaction));
