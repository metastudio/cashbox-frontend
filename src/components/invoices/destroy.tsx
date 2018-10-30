import * as React from 'react';

import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Dispatch } from 'redux';

import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import { destroyInvoice, IInvoice, selectInvoice } from 'services/invoices';
import { selectCurrentOrganizationId } from 'services/organizations';

import { confirm } from 'components/utils/confirm';

interface IStateProps {
  orgId:        number;
  invoice:      IInvoice | null;
}

interface IDispatchProps {
  destroy: typeof destroyInvoice.request;
  message: typeof addFlashMessage;
}

type IProps = IStateProps & IDispatchProps & RouteComponentProps<{ id: string }>;

class DestroyButton extends React.Component<IProps> {
  private handleDestroy = () => {
    const { orgId, invoice, destroy } = this.props;
    if (!invoice) { return; }

    confirm('Are you sure?').then(() => {
      new Promise((resolve, reject) => {
        destroy(orgId, invoice.id, resolve, reject);
      }).then(() => {
        const { message, history } = this.props;

        message('Invoice successfully destroyed');
        history.push('/invoices');
      });
    });
  }

  public render() {
    return(
      <Button bsStyle="danger" onClick={ this.handleDestroy }>Destroy</Button>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  orgId:        selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
  invoice:      selectInvoice(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  destroy: (orgId, invoiceId, res, rej) => dispatch(destroyInvoice.request(orgId, invoiceId, res, rej)),
  message: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(DestroyButton));
