import * as React from 'react';

import { Button, Col, Row } from 'react-bootstrap';
import { FieldArray, GenericFieldArray, WrappedFieldArrayProps } from 'redux-form';

import InvoiceItemFields, { InvoiceItemFormData } from './item-fields';
import RemoveItemButton from './remove-item';

class ItemsFields extends React.PureComponent<WrappedFieldArrayProps<InvoiceItemFormData>> {
  private renderField = (name: string, idx: number) => {
    const invoiceItem = this.props.fields.get(idx);

    if (invoiceItem._destroy) {
      return null;
    }

    return(
      <Row key={ idx }>
        <Col xs={ 12 }>
          <RemoveItemButton name={ name } idx={ idx } fields={ this.props.fields } invoiceItem={ invoiceItem } />
          <InvoiceItemFields name={ name } idx={ idx } />
        </Col>
      </Row>
    );
  }

  private handleAddItem = () => {
    this.props.fields.push({});
  }

  public render () {
    const { fields } = this.props;
    return(
      <>
        { fields.map(this.renderField) }
        <Button onClick={ this.handleAddItem }>Add Item...</Button>
      </>
    );
  }
}

const InvoiceItemsArray = FieldArray as new () => GenericFieldArray<InvoiceItemFormData>;

export { ItemsFields as default, InvoiceItemsArray };
