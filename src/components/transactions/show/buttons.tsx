import * as React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { ITransaction } from 'services/transactions';

import Destroy from '../destroy';

interface IProps {
  transaction: ITransaction;
}

const ShowTransactionButtons: React.SFC<IProps> = ({ transaction }) => (
  <>
    <span className="pull-left">
      <Destroy transaction={ transaction } />
      <LinkContainer to={ { pathname: '/transactions/new', search: `copyId=${transaction.id}` } }>
        <Button>Copy</Button>
      </LinkContainer>
      <LinkContainer to={ `/transactions/${transaction.id}/edit` }>
        <Button>Edit</Button>
      </LinkContainer>
    </span>

    <LinkContainer exact to={ '/transactions' }>
      <Button>Close</Button>
    </LinkContainer>
  </>
);

export default ShowTransactionButtons;
