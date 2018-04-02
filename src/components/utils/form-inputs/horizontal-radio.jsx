import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'react-bootstrap';

import FormGroup from './horizontal-form-group.jsx';

export const HorizontalRadio = ({ label, field, collection, ...inputProps }) => {
  return (
    <FormGroup field={ field } label={ label } >
      {
        collection.map((i) => (
          <Radio key={ i.value } {...inputProps} value={ i.value } checked={ field.value === i.value } onChange={ field.onChange } >
            { i.label }
          </Radio>
        ))
      }
    </FormGroup>
  );
};

HorizontalRadio.propTypes = {
  field:      PropTypes.object.isRequired,
  label:      PropTypes.string,
  collection: PropTypes.array.isRequired,
};
