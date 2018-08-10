import * as React from 'react';
import { FormControl } from 'react-bootstrap';
import { WrappedFieldProps } from 'redux-form';

import { wrapInlineFormGroup }     from './inline-form-group';
import { wrapHorizontalFormGroup } from './horizontal-form-group';
import { wrapVerticalFormGroup }   from './vertical-form-group';
import { wrapNoLabelFormGroup } from './no-label-form-group';

type IProps = FormControl.FormControlProps & WrappedFieldProps;

const FormInput: React.SFC<IProps> = ({ input, meta, ...inputProps }) => (
  <FormControl { ...inputProps } { ...input } />
);

FormInput.defaultProps = {
  type: 'text',
};

const InlineFormInput     = wrapInlineFormGroup<IProps>(FormInput);
const HorizontalFormInput = wrapHorizontalFormGroup<IProps>(FormInput);
const VerticalFormInput   = wrapVerticalFormGroup<IProps>(FormInput);
const NoLabelFormInput    = wrapNoLabelFormGroup<IProps>(FormInput);

export {
  FormInput,
  InlineFormInput,
  HorizontalFormInput,
  VerticalFormInput,
  NoLabelFormInput,
};
