import * as React from 'react';

import { Col, Panel, Row } from 'react-bootstrap';

import { ID } from 'model-types';
import { ITransactionsSummary } from 'services/transactions-summary';

import Provider from './provider';
import Table from './table';

interface IProps {
  orgId:  ID;
  search: string;
}

class TransactionsSummary extends React.PureComponent<IProps> {
  private renderContent = (summary: ITransactionsSummary): React.ReactNode => {
    return <Table summary={ summary } />;
  }

  public render() {
    const { orgId, search } = this.props;
    return (
      <Row id="transactions_summary">
        <Col xs={ 12 } sm={ 8 } md={ 9 }>
          <Panel>
            <Provider orgId={ orgId } search={ search }>
              { this.renderContent }
            </Provider>
          </Panel>
        </Col>
      </Row>
    );
  }
}

export default TransactionsSummary;
