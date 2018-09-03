import * as React from 'react';

import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ITransaction } from 'services/transactions';
import { locationWithKeys } from 'utils/url-helpers';

import Destroy from '../destroy';

interface IOwnProps {
  transaction: ITransaction;
  onCancel: () => void;
}

type IProps = RouteComponentProps<{}> & IOwnProps;

const ShowTransactionButtons: React.SFC<IProps> = ({
  transaction,
  onCancel,
  location: { search },
}) => {
  return (
    <>
      <span className="pull-left">
        <Destroy transaction={ transaction }>
          <Button bsStyle="danger">Remove</Button>
        </Destroy>
        <LinkContainer
          to={ locationWithKeys({ search, pathname: '/transactions/new' }, { copyId: String(transaction.id) }) }
        >
          <Button>Copy</Button>
        </LinkContainer>
        <LinkContainer
          to={ { search, pathname: `/transactions/${transaction.id}/edit` } }
        >
          <Button>Edit</Button>
        </LinkContainer>
      </span>

      <Button onClick={ onCancel }>Close</Button>
    </>
  );
};

export default withRouter<IProps>(ShowTransactionButtons);
