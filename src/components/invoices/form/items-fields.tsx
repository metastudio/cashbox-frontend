import * as React from 'react';
import { FieldArray, WrappedFieldArrayProps, GenericFieldArray } from 'redux-form';
import { Button, Row, Col } from 'react-bootstrap';

import InvoiceItemFields, { InvoiceItemFormData } from './item-fields';
import RemoveItemButton from './remove-item';

const ItemsFields: React.SFC<WrappedFieldArrayProps<InvoiceItemFormData>> = ({ fields }) => {
  return(
    <>
      {
        fields.map((name, idx) => {
          const invoiceItem = fields.get(idx);

          if (invoiceItem._destroy) {
            return null;
          }

          return(
            <Row key={ idx }>
              <Col xs={ 12 }>
                <RemoveItemButton idx={ idx } fields={ fields } invoiceItem={ invoiceItem } />
                <InvoiceItemFields name={ name } idx={ idx } />
              </Col>
            </Row>
          );
        })
      }

      <Button onClick={ () => fields.push({}) }>Add Item</Button>
    </>
  );
};

const InvoiceItemsArray = FieldArray as new () => GenericFieldArray<InvoiceItemFormData>;

export { ItemsFields as default, InvoiceItemsArray };
