import React from 'react';
import { Modal, Button, Tabs, Tab } from 'react-bootstrap';

import NewIncomeTransaction from './new/income.jsx';
import NewExpenseTransaction from './new/expense.jsx';
import NewTransfer from './new/transfer.jsx';

class NewTransaction extends React.Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return(
      <div>
        <Button bsStyle="primary" onClick={ this.handleShow } >Add...</Button>
        <Modal show={ this.state.show } onHide={ this.handleClose }>
          <Modal.Header closeButton>
            <Modal.Title>New Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs defaultActiveKey={ 1 } id="transactionType">
              <Tab eventKey={ 1 } title="Income">
                <NewIncomeTransaction />
              </Tab>
              <Tab eventKey={ 2 } title="Expense">
                <NewExpenseTransaction />
              </Tab>
              <Tab eventKey={ 3 } title="Transfer">
                <NewTransfer />
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default NewTransaction;
