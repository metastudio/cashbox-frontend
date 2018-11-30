import * as React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  IBankAccount,
  selectBankAccountsWithCurrency,
  updateBankAccountPosition,
} from 'services/bank-accounts';

import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';

import { ID } from 'model-types';

import Row from './table-row';

interface IOwnProps {
  currency: string;
}

interface IStateProps {
  orgId:        ID;
  bankAccounts: IBankAccount[];
}

interface IDispatchProps {
  update: typeof updateBankAccountPosition.request;
}

type IProps = IOwnProps & IStateProps & IDispatchProps;

class BankAccountsTable extends React.Component<IProps> {
  private getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
  })

  private onDragEnd = (result: any) => {
    const { orgId, bankAccounts, update } = this.props;

    // dropped outside the list
    if (!result.destination) {
      return;
    }
    // dropped to same position
    if (result.source.index === result.destination.index) {
      return;
    }

    const bankAccount = Array.from(bankAccounts)[result.source.index];
    const position = Array.from(bankAccounts)[result.destination.index].position;

    return new Promise((resolve, reject) => {
      update(
        orgId,
        bankAccount!.id,
        { position },
        resolve,
        reject,
      );
    }).catch(prepareSubmissionError);
  }

  private renderRows = (bankAccounts: IBankAccount[], provided: any, snapshot: any) => {
    return (
      <tbody
        ref={ provided.innerRef }
        style={ this.getListStyle(snapshot.isDraggingOver) }
      >
        { bankAccounts.map((ba, i) => ba ? <Row bankAccount={ ba } key={ ba.id } idx={ i } /> : null) }
        { provided.placeholder }
      </tbody>
    );
  }

  public render() {
    const { bankAccounts, currency } = this.props;
    return (
      <Table striped responsive hover id={ `bankAccounts-${currency}` }>
        <thead>
          <tr>
            <th className="col-xs-3">Name</th>
            <th className="col-xs-1">Balance</th>
            <th className="col-xs-4">Description</th>
            <th className="col-xs-3">Invoice Details</th>
            <th className="col-xs-1" colSpan={ 2 } />
          </tr>
        </thead>

        <DragDropContext onDragEnd={ this.onDragEnd }>
          <Droppable droppableId={ `droppable-${currency}` }>
            { (provided, snapshot) => this.renderRows(bankAccounts, provided, snapshot) }
          </Droppable>
        </DragDropContext>

      </Table>
    );
  }
}

const mapState = (state: IGlobalState, props: IOwnProps) => ({
  orgId:        selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
  bankAccounts: selectBankAccountsWithCurrency(state, props.currency),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  update: (orgId, baId, data) => dispatch(updateBankAccountPosition.request(orgId, baId, data)),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(BankAccountsTable);
