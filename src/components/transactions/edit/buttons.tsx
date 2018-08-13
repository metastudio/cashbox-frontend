import * as React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { ITransaction } from 'services/transactions';

import Destroy from '../destroy';

interface IProps {
  transaction: ITransaction;
}

const EditTransactionButtons: React.SFC<IProps> = ({ transaction }) => (
  <>
    <span className="pull-left">
      <Destroy transaction={ transaction } />
    </span>

    <LinkContainer exact to={ '/transactions' }>
      <Button>Cancel</Button>
    </LinkContainer>
  </>
);

export default EditTransactionButtons;
