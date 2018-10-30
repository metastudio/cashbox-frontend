import * as React from 'react';

import { FormControl } from 'react-bootstrap';
import { WrappedFieldProps } from 'redux-form';

import { wrapHorizontalFormGroup } from './horizontal-form-group';
import { wrapInlineFormGroup } from './inline-form-group';

interface IOption {
  value: string;
  label: string;
}

interface IOwnProps {
  collection: IOption[];
  prompt?:    string;
}

type IProps = IOwnProps & WrappedFieldProps;

const Select: React.SFC<IProps> = ({ input, collection, prompt, ...inputProps }) => {
  delete inputProps.meta;

  const options = collection.map(i => (
    <option key={ i.value } value={ i.value }>
      { i.label }
    </option>
  ));

  return (
    <FormControl componentClass="select" { ...inputProps } { ...input } >
      { !input.value && prompt && <option>{ prompt }</option> }
      { options }
    </FormControl>
  );
};

const InlineSelect     = wrapInlineFormGroup<IProps>(Select);
const HorizontalSelect = wrapHorizontalFormGroup<IProps>(Select);

export { InlineSelect, HorizontalSelect };
