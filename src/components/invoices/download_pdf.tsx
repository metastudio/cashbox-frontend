import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as FileSaver from 'file-saver';

import { selectCurrentOrganizationId } from 'services/organizations';
import { addFlashMessage } from 'services/flash-messages';
import { Invoice, downloadInvoicePDF } from 'services/invoices';

interface IStateProps {
  orgId: number;
}

interface IParamsProps {
  invoice: Invoice;
}

interface IDispatchProps {
  downloadPDF:  (orgId: number, invoiceId: number) => Promise<Blob>;
  errorMessage: (msg: string) => void;
}

type IProps = IStateProps & IDispatchProps & IParamsProps;

class DownloadPDFButton extends React.Component<IProps> {
  private handleDownloadPDF = () => {
    const { orgId, invoice, downloadPDF, errorMessage } = this.props;

    downloadPDF(orgId, invoice.id).then((blob) => {
      FileSaver.saveAs(blob, 'invoice.pdf');
    }).catch((error) => {
      errorMessage(`Error on downloading PDF: ${error.message}`);
    });
  }

  public render() {
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
  errorMessage: (msg: string) => dispatch(addFlashMessage(msg, { type: 'danger' })),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(DownloadPDFButton);
