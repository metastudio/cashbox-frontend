import * as React from 'react';
import { Modal, Tabs, Tab, Row, Col } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import NewIncomeTransaction from './new/income.jsx';
import NewExpenseTransaction from './new/expense.jsx';
import NewTransfer from './new/transfer.jsx';

interface State {
  show: boolean;
}

type Props = RouteComponentProps<{ id: string }>;

class NewTransaction extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.history.push('/transactions');
  }

  render() {
    return(
      <div>
        <Modal show onHide={ this.handleClose }>
          <Modal.Header closeButton>
            <Modal.Title>New Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={ 12 }>
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
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default withRouter(NewTransaction);
