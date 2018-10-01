import * as React from 'react';

import { Col, Panel, Row, Table } from 'react-bootstrap';

import { CURRENCIES } from 'constants/currencies';
import { ID } from 'model-types';
import { ITransactionsSummary } from 'services/transactions-summary';

import Provider from './provider';
import Line from './table-line';

interface IProps {
  orgId:  ID;
  search: string;
}

class TransactionsSummary extends React.PureComponent<IProps> {
  private renderContent = (summary: ITransactionsSummary): React.ReactNode => {
    return (
      <Table condensed striped>
        <thead>
          <tr>
            <th>Currency</th>
            <th className="text-right">Income</th>
            <th className="text-right">Expense</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          { CURRENCIES.map(c => <Line key={ c } title={ c } summaryLine={ summary[c] } />) }
          <Line title="Total" summaryLine={ summary.total } />
        </tbody>
      </Table>
    );
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
