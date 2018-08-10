import * as React from 'react';
import { Checkbox } from 'react-bootstrap';

import FormGroup, { IHorizontalFormGroupProps } from './horizontal-form-group';

type IProps = IHorizontalFormGroupProps;

const HorizontalCheckbox: React.SFC<IProps> = ({ input, meta, label, ...inputProps }) => (
  <FormGroup input={ input } meta={ meta }>
    <Checkbox { ...inputProps } { ...input } checked={ input.value }>
      { label }
    </Checkbox>
  </FormGroup>
);

export { HorizontalCheckbox };
