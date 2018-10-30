import * as React from 'react';

import { Radio } from 'react-bootstrap';
import { WrappedFieldProps } from 'redux-form';

import { wrapHorizontalFormGroup } from './horizontal-form-group';

interface IOption {
  value: string;
  label: string;
}

interface IOwnProps {
  collection: IOption[];
}

type IProps = IOwnProps & Radio.RadioProps & WrappedFieldProps;

const RadioInput: React.SFC<IProps> = ({ input, collection, ...inputProps }) => {
  delete inputProps.meta;

  const options = collection.map(i => (
    <Radio
      key={ i.value }
      { ...inputProps }
      value={ i.value }
      checked={ input.value === i.value }
      onChange={ input.onChange }
    >
      { i.label }
    </Radio>
  ));

  return (
    <div>
      { options }
    </div>
  );
};

const HorizontalRadio = wrapHorizontalFormGroup<IProps>(RadioInput);

export { HorizontalRadio };
