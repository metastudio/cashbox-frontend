import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { change, FieldsProps } from 'redux-form';
import { Button } from 'react-bootstrap';
import { InvoiceItemFormData } from './item-fields';

interface IOwnProps {
  name:   string;
  idx:    number;
  fields: FieldsProps<InvoiceItemFormData>;
  invoiceItem: InvoiceItemFormData;
}

interface IDispatchProps {
  changeField: (formName: string, formField: string, value: string) => void;
}

type Props = IOwnProps & IDispatchProps;

class RemoveItemButton extends React.Component<Props> {
  private handleRemove = () => {
    const { name, idx, invoiceItem, changeField, fields } = this.props;

    if (invoiceItem.id) {
      changeField('invoiceForm', `${name}._destroy`, 'true');
    } else {
      fields.remove(idx);
    }
  }

  public render() {
    return(
      <Button bsStyle="danger" onClick={ this.handleRemove }>Remove Item</Button>
    );
  }
}

const mapDispatch = (dispatch: Dispatch) => ({
  changeField: (formName: string, formField: string, value: string) => dispatch(change(formName, formField, value)),
});

export default connect<{}, IDispatchProps>(undefined, mapDispatch)(RemoveItemButton);
