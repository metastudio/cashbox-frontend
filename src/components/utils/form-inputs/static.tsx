import * as React from 'react';
import { FormControl } from 'react-bootstrap';
import { WrappedFieldProps } from 'redux-form';

import { wrapHorizontalFormGroup } from './horizontal-form-group';

type IProps = WrappedFieldProps;

const FormInput: React.SFC<IProps> = ({ input, meta, ...inputProps }) => (
  <FormControl.Static>{ input.value }</FormControl.Static>
);

const HorizontalStatic = wrapHorizontalFormGroup<IProps>(FormInput);

export {
  HorizontalStatic,
};
