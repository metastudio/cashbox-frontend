import * as React from 'react';
import { FieldArray, WrappedFieldArrayProps, GenericFieldArray } from 'redux-form';
import { Button } from 'react-bootstrap';

import InvoiceItemFields, { InvoiceItemFormData } from './item-fields';

const ItemsFields: React.SFC<WrappedFieldArrayProps<InvoiceItemFormData>> = ({ fields }) => (
  <>
    { fields.map((name, i) => <InvoiceItemFields key={ i } name={ name } idx={ i } />) }

    <Button onClick={ () => fields.push({}) }>Add Item</Button>
  </>
);
const InvoiceItemsArray = FieldArray as new () => GenericFieldArray<InvoiceItemFormData>;

export { ItemsFields as default, InvoiceItemsArray };
