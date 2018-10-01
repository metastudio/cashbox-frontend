import * as React from 'react';

import { Col, Panel, Row, Table } from 'react-bootstrap';

import { ID } from 'model-types';
import { ITransactionsSummary } from 'services/transactions-summary';

import { MoneyAmount } from 'components/utils/money';
import Provider from './providers/summary';

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
          <tr>
            <td>Total:</td>
            <td className="text-right"><MoneyAmount amount={ summary.income } colorize /></td>
            <td className="text-right"><MoneyAmount amount={ summary.expense } colorize /></td>
            <td className="text-right"><MoneyAmount amount={ summary.total } colorize /></td>
          </tr>
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
