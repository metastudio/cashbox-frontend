import * as React from 'react';

import { Col, Panel, Row } from 'react-bootstrap';

import { ID } from 'model-types';
import { ITransactionsSummary } from 'services/transactions-summary';

import Provider from './provider';
import Table from './table';
import ToggleButton from './toggle-button';

import './index.css';

interface IProps {
  orgId:  ID;
  search: string;
}

interface IState {
  visible: boolean;
}

class TransactionsSummary extends React.PureComponent<IProps, IState> {
  public state = {
    visible: false,
  };

  private renderContent = (summary: ITransactionsSummary): React.ReactNode => {
    return <Table summary={ summary } />;
  }

  private handleToggle = () => {
    this.setState({
      visible: !this.state.visible,
    });
  }

  public render() {
    const { orgId, search } = this.props;
    const { visible } = this.state;
    return (
      <Row id="transactions_summary">
        <Col xs={ 12 } sm={ 8 } md={ 9 }>
          <Panel>
            <ToggleButton onToggle={ this.handleToggle } visible={ visible } />
            { visible && <Provider orgId={ orgId } search={ search }>{ this.renderContent }</Provider> }
          </Panel>
        </Col>
      </Row>
    );
  }
}

export default TransactionsSummary;
