import * as React from 'react';

import { Button, Table } from 'react-bootstrap';
import { FieldArray, GenericFieldArray, WrappedFieldArrayProps } from 'redux-form';

import InvoiceItemFields, { InvoiceItemFormData } from './item-fields';

class ItemsFields extends React.PureComponent<WrappedFieldArrayProps<InvoiceItemFormData>> {
  private renderField = (name: string, idx: number) => {
    const invoiceItem = this.props.fields.get(idx);

    if (invoiceItem._destroy) {
      return null;
    }

    return(
      <InvoiceItemFields key={ idx } name={ name } idx={ idx } invoiceItem={ invoiceItem } />
    );
  }

  private handleAddItem = () => {
    this.props.fields.push({});
  }

  public render () {
    const { fields } = this.props;
    return(
      <fieldset className="form-table">
        <h3>Items</h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th className="col-xs-4">Customer</th>
              <th className="col-xs-2">Amount</th>
              <th className="col-xs-2">Date</th>
              <th className="col-xs-2">Hours</th>
              <th className="col-xs-2">Description</th>
              <th />
            </tr>
          </thead>
          <tbody>
            { fields.map(this.renderField) }
            <tr>
              <td colSpan={ 7 }>
                <Button onClick={ this.handleAddItem }>Add Item...</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </fieldset>
    );
  }
}

const InvoiceItemsArray = FieldArray as new () => GenericFieldArray<InvoiceItemFormData>;

export { ItemsFields as default, InvoiceItemsArray };
