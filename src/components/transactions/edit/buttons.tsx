import * as React from 'react';
import { Button } from 'react-bootstrap';

import { ITransaction } from 'services/transactions';

import Destroy from '../destroy';

interface IProps {
  transaction: ITransaction;
  onCancel: () => void;
}

const EditTransactionButtons: React.SFC<IProps> = ({ transaction, onCancel }) => (
  <>
    <span className="pull-left">
      <Destroy transaction={ transaction } />
    </span>

    <Button onClick={ onCancel } >Cancel</Button>
  </>
);

export default EditTransactionButtons;
