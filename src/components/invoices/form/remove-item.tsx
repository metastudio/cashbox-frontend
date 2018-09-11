import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { arrayRemove, change } from 'redux-form';

import { INVOICE_FORM } from 'constants/forms';
import { IInvoiceItemFormData } from 'services/redux-form';

import { FaButton } from 'components/utils/fa';

interface IOwnProps {
  name:        string;
  idx:         number;
  invoiceItem: IInvoiceItemFormData;
}

interface IDispatchProps {
  changeField: (form: string, field: string, value: string) => void;
  removeField: (form: string, field: string, idx: number) => void;
}

type Props = IOwnProps & IDispatchProps;

class RemoveItemButton extends React.PureComponent<Props> {
  private handleRemove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const { name, idx, invoiceItem, changeField, removeField } = this.props;

    if (invoiceItem.id) {
      changeField(INVOICE_FORM, `${name}._destroy`, 'true');
    } else {
      removeField(INVOICE_FORM, 'invoiceItems', idx);
    }
  }

  public render() {
    return(
      <FaButton icon="trash-o" onClick={ this.handleRemove } />
    );
  }
}

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  changeField: (form, field, value) => dispatch(change(form, field, value)),
  removeField: (form, field, idx) => dispatch(arrayRemove(form, field, idx)),
});

export default connect<{}, IDispatchProps, IOwnProps>(undefined, mapDispatch)(RemoveItemButton);
