import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { change } from 'redux-form';
import { Button } from 'react-bootstrap';
import { FieldsProps } from 'redux-form';
import { InvoiceItemFormData } from './item-fields';

interface OwnProps {
  idx:    number;
  fields: FieldsProps<InvoiceItemFormData>;
  invoiceItem: InvoiceItemFormData;
}

interface DispatchProps {
  changeField: (formName: string, formField: string, value: string) => void;
}

type Props = OwnProps & DispatchProps;

class RemoveItemButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  handleRemove = (idx: number) => {
    const { invoiceItem, changeField, fields } = this.props;

    if (invoiceItem.id) {
      changeField('invoiceForm', `invoiceItems[${idx}]._destroy`, 'true');
    } else {
      fields.remove(idx);
    }
  }

  render() {
    const { idx } = this.props;

    return(
      <Button bsStyle="danger" onClick={ () => this.handleRemove(idx) }>Remove Item</Button>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  changeField: (formName: string, formField: string, value: string) => dispatch(change(formName, formField, value))
});

export default connect<{}, DispatchProps>(undefined, mapDispatch)(RemoveItemButton);
