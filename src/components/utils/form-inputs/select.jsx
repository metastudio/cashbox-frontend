import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

import { wrapInlineFormGroup } from './inline-form-group.jsx';
import { wrapHorizontalFormGroup } from './horizontal-form-group';

const Select = ({ input, collection, prompt, ...inputProps }) => {
  delete inputProps.meta;

  return (
    <FormControl componentClass="select" {...inputProps} {...input} >
      { !input.value && prompt && <option>{ prompt }</option> }
      {
        collection.map((i) => (
          <option key={ i.value } value={ i.value }>
            { i.label }
          </option>
        ))
      }
    </FormControl>
  );
};

Select.propTypes = {
  input:      PropTypes.object.isRequired,
  meta:       PropTypes.object,
  collection: PropTypes.array.isRequired,
  prompt:     PropTypes.string,
};

const InlineSelect     = wrapInlineFormGroup(Select);
const HorizontalSelect = wrapHorizontalFormGroup(Select);

export { InlineSelect, HorizontalSelect };
