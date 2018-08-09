import * as React from 'react';
import { FormControl } from 'react-bootstrap';
import { WrappedFieldProps } from 'redux-form';

import { wrapInlineFormGroup }     from './inline-form-group';
import { wrapHorizontalFormGroup } from './horizontal-form-group';
import { wrapVerticalFormGroup }   from './vertical-form-group';
import { wrapNoLabelFormGroup } from './no-label-form-group';

type IProps = FormControl.FormControlProps & WrappedFieldProps;

const Textarea: React.SFC<IProps> = ({ input, meta, ...inputProps }) => (
  <FormControl { ...inputProps } { ...input } componentClass="textarea" />
);

const InlineTextarea     = wrapInlineFormGroup<IProps>(Textarea);
const HorizontalTextarea = wrapHorizontalFormGroup<IProps>(Textarea);
const VerticalTextarea   = wrapVerticalFormGroup<IProps>(Textarea);
const NoLabelTextarea    = wrapNoLabelFormGroup<IProps>(Textarea);

export {
  Textarea,
  InlineTextarea,
  HorizontalTextarea,
  VerticalTextarea,
  NoLabelTextarea,
};
