import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as FileSaver from 'file-saver';

import { selectCurrentOrganizationId } from 'services/organizations';
import { addFlashMessage } from 'services/flash-messages';
import { Invoice, downloadInvoicePDF } from 'services/invoices';

interface StateProps {
  orgId: number;
}

interface ParamsProps {
  invoice: Invoice;
}

interface DispatchProps {
  downloadPDF:  (orgId: number, invoiceId: number) => Promise<Blob>;
  errorMessage: (msg: string) => void;
}

type Props = StateProps & DispatchProps & ParamsProps;

class DownloadPDFButton extends React.Component<Props> {
  handleDownloadPDF = () => {
    const { orgId, invoice, downloadPDF, errorMessage } = this.props;

    downloadPDF(orgId, invoice.id).then((blob) => {
      FileSaver.saveAs(blob, 'invoice.pdf');
    }).catch((error) => {
      errorMessage(`Error on downloading PDF: ${error.message}`);
    });
  }

  render() {
    return(<Button onClick={ this.handleDownloadPDF }>Download as PDF</Button>);
  }
}

const mapState = (state: {}) => ({
  orgId: selectCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  downloadPDF:  (orgId: number, invoiceId: number | string) => new Promise<Blob>((res, rej) => {
    dispatch(downloadInvoicePDF(orgId, invoiceId, res, rej));
  }),
  errorMessage: (msg: string) => dispatch(addFlashMessage(msg, { type: 'danger' } )),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(DownloadPDFButton);
