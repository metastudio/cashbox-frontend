import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router';

import { Invoice } from 'model-types';
import { destroyInvoice } from 'actions/invoices.js';
import { addFlashMessage } from 'actions/flash-messages.js';

import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectInvoice } from 'selectors/invoices.js';

interface StateProps {
  orgId:        number;
  invoice:      Invoice | null;
}

interface DispatchProps {
  destroy:      (orgId: number, invoiceId: number) => Promise<{}>;
  flashMessage: (message: string) => void;
}

type RouteProps = RouteComponentProps<{ id: string }>;
type Props = StateProps & DispatchProps & RouteProps;

class DestroyButton extends React.Component<Props> {
  handleDestroy = () => {
    const { orgId, invoice, destroy } = this.props;
    if (!invoice) { return; }

    destroy(orgId, invoice.id).then(() => {
      const { flashMessage, history } = this.props;

      flashMessage('Invoice successfully destroyed');
      history.push('/invoices');
    });
  }

  render() {
    return(
      <Button bsStyle="danger" onClick={ this.handleDestroy }>Destroy</Button>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:        getCurrentOrganizationId(state),
  invoice:      selectInvoice(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  destroy:      (orgId: number, invoiceId: number) => new Promise((res, rej) => {
    dispatch(destroyInvoice(orgId, invoiceId, res, rej));
  }),
  flashMessage: (msg: string) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(DestroyButton));
