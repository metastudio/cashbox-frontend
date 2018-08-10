import * as React from 'react';
import { Modal, Tabs, Tab, Clearfix } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import NewNormal   from './new/normal';
import NewTransfer from './new/transfer';
import { CategoryType } from 'services/categories';

type IProps = RouteComponentProps<{ id: string }>;

class NewTransaction extends React.PureComponent<IProps> {
  private handleClose = () => {
    this.props.history.push('/transactions');
  }

  public render() {
    return(
      <Modal show onHide={ this.handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>New Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey={ 1 } mountOnEnter id="transactionType">
            <Tab eventKey={ 1 } title="Income">
              <NewNormal type={ CategoryType.Income } />
            </Tab>
            <Tab eventKey={ 2 } title="Expense">
              <NewNormal type={ CategoryType.Expense } />
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

export default withRouter(NewTransaction);
