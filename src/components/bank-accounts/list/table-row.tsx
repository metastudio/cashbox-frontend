import * as React from 'react';
import { Link } from 'react-router-dom';

import { Draggable } from 'react-beautiful-dnd';
import { IBankAccount } from 'services/bank-accounts';
import DestroyButton from '../destroy';

import { MoneyAmount } from 'components/utils/money';

interface IProps {
  bankAccount: IBankAccount;
  idx:         number;
}

const getItemStyle = (draggableStyle: any, isDragging: any) => ({
  userSelect: 'none',
  background: isDragging ? 'lightgreen' : 'white',
  ...draggableStyle,
});

const renderRow = (bankAccount: IBankAccount, provided: any, snapshot: any) => {
  return (
    <tr
      className={ bankAccount.visible ? '' : 'text-muted' }
      ref={ provided.innerRef }
      { ...provided.draggableProps }
      { ...provided.dragHandleProps }
      style={ getItemStyle(provided.draggableProps.style, snapshot.isDragging) }
    >
      <td>{ bankAccount.name }</td>
      <td className="text-right">
        <MoneyAmount colorize="onlyNegative" amount={ bankAccount.balance } />
      </td>
      <td>{ bankAccount.description }</td>
      <td>{ bankAccount.invoiceDetails }</td>
      <td><Link to={ `/bank_accounts/${bankAccount.id}/edit` } title="Edit"><i className="fa fa-edit" /></Link></td>
      <td><DestroyButton bankAccount={ bankAccount } /></td>
      { provided.placeholder }
    </tr>
  );
};

const BankAccountsTableRow: React.SFC<IProps> = ({ bankAccount, idx }) => (
  <Draggable key={ bankAccount.id } draggableId={ `ba-${bankAccount.id}` } index={ idx }>
    { (provided, snapshot) => renderRow(bankAccount, provided, snapshot) }
  </Draggable>
);

export default BankAccountsTableRow;
