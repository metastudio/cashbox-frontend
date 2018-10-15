import * as React from 'react';

import { Button, Table } from 'react-bootstrap';
import { FieldArray, GenericFieldArray, WrappedFieldArrayProps } from 'redux-form';

import { IInvoiceItemFormData } from 'services/redux-form/invoice-form';

import { Fa } from 'components/utils/fa';
import InvoiceItemFields from './item-fields';

class ItemsFields extends React.PureComponent<WrappedFieldArrayProps<IInvoiceItemFormData>> {
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
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th className="col-xs-3">Customer</th>
              <th className="col-xs-3">Task</th>
              <th className="col-xs-2">Date</th>
              <th className="col-xs-2">Hours</th>
              <th className="col-xs-2">Amount</th>
              <th />
            </tr>
          </thead>
          <tbody>
            { fields.map(this.renderField) }
            <tr>
              <td />
              <td colSpan={ 6 }>
                <Button bsStyle="link" onClick={ this.handleAddItem }>
                  <Fa icon="plus" /> Add Item...
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </fieldset>
    );
  }
}

const InvoiceItemsArray = FieldArray as new () => GenericFieldArray<IInvoiceItemFormData>;

export { ItemsFields as default, InvoiceItemsArray };
