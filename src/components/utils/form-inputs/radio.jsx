import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'react-bootstrap';

import { wrapHorizontalFormGroup } from './horizontal-form-group';

export const RadioInput = ({ input, collection, ...inputProps }) => {
  delete inputProps.meta;

  return (
    <div>
      {
        collection.map((i) => (
          <Radio key={ i.value } {...inputProps} value={ i.value } checked={ input.value === i.value } onChange={ input.onChange } >
            { i.label }
          </Radio>
        ))
      }
    </div>
  );
};

RadioInput.propTypes = {
  input:      PropTypes.object.isRequired,
  meta:       PropTypes.object,
  collection: PropTypes.array.isRequired,
};

const HorizontalRadio = wrapHorizontalFormGroup(RadioInput);

export { HorizontalRadio };
