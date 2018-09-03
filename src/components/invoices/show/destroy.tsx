import * as React from 'react';

import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Dispatch } from 'redux';

import { addFlashMessage } from 'services/flash-messages';
import { destroyInvoice, IInvoice, selectInvoice } from 'services/invoices';
import { selectCurrentOrganizationId } from 'services/organizations';

interface IStateProps {
  orgId:        number;
  invoice:      IInvoice | null;
}

interface IDispatchProps {
  destroy:      (orgId: number, invoiceId: number) => Promise<{}>;
  flashMessage: (message: string) => void;
}

type IProps = IStateProps & IDispatchProps & RouteComponentProps<{ id: string }>;

class DestroyButton extends React.Component<IProps> {
  private handleDestroy = () => {
    const { orgId, invoice, destroy } = this.props;
    if (!invoice) { return; }

    destroy(orgId, invoice.id).then(() => {
      const { flashMessage, history } = this.props;

      flashMessage('Invoice successfully destroyed');
      history.push('/invoices');
    });
  }

  public render() {
    return(
      <Button bsStyle="danger" onClick={ this.handleDestroy }>Destroy</Button>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:        selectCurrentOrganizationId(state),
  invoice:      selectInvoice(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  destroy:      (orgId: number, invoiceId: number) => new Promise((res, rej) => {
    dispatch(destroyInvoice(orgId, invoiceId, res, rej));
  }),
  flashMessage: (msg: string) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(DestroyButton));
