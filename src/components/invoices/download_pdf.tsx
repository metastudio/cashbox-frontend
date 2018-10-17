import * as React from 'react';

import * as FileSaver from 'file-saver';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ID } from 'model-types';
import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import { downloadInvoicePDF, IInvoice } from 'services/invoices';
import { selectCurrentOrganizationId } from 'services/organizations';

interface IStateProps {
  orgId: ID;
}

interface IParamsProps {
  invoice: IInvoice;
}

interface IDispatchProps {
  downloadPDF: typeof downloadInvoicePDF.request;
  message:     typeof addFlashMessage;
}

type IProps = IStateProps & IDispatchProps & IParamsProps;

class DownloadPDFButton extends React.Component<IProps> {
  private handleDownloadPDF = () => {
    const { orgId, invoice, downloadPDF, message } = this.props;

    new Promise<Blob>((resolve, reject) => {
      downloadPDF(orgId, invoice.id, resolve, reject);
    }).then((blob) => {
      FileSaver.saveAs(blob, 'invoice.pdf');
    }).catch((error) => {
      message(`Error on downloading PDF: ${error.message}`, { type: 'danger' });
    });
  }

  public render() {
    return(<Button onClick={ this.handleDownloadPDF }>Download as PDF</Button>);
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  orgId: selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  downloadPDF: (orgId, invoiceId, res, rej) => dispatch(downloadInvoicePDF.request(orgId, invoiceId, res, rej)),
  message:     (msg, opts) => dispatch(addFlashMessage(msg, opts)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(DownloadPDFButton);
