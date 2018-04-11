import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Async, Option } from 'react-select';
import { WrappedFieldProps } from 'redux-form';

import { Customer } from 'model-types';
import { loadCustomers } from 'actions/customers.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group.jsx';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

import 'react-select/dist/react-select.css';
import 'components/utils/form-inputs/async-select-fix.css';

interface OwnProps {
  emptyTitle?: string;
}

interface StateProps {
  orgId: number;
}

interface DispatchProps {
  load: (orgId: number) => Promise<Customer[]>;
}

type Props = OwnProps & WrappedFieldProps & StateProps & DispatchProps;

const CustomersSelect: React.SFC<Props> = ({ orgId, input, load, emptyTitle, ...inputProps }) => {
  const loadOptions = () => (
    load(orgId).then((customers) => ({
      options: (emptyTitle ? [{ value: '', label: emptyTitle }] : [])
        .concat(customers.map(c => ({ value: String(c.id), label: c.name })))
    }))
  );

  delete inputProps.meta;

  const handleChange = (value: Option<string>) => {
    input.onChange(value && value.value);
  };

  return (
    <Async
      { ...inputProps }
      name={ input.name }
      value={ String(input.value) }
      onChange={ handleChange }
      onBlur={ () => input.onBlur(input.value) }
      cache={ {} }
      loadOptions={ loadOptions }
    />
  );
};

const mapState = (state: {}) => ({
  orgId: getCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => new Promise<Customer[]>((res, rej) => dispatch(loadCustomers(orgId, res, rej))),
});

const CustomersSelectContainer =
  connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch)(CustomersSelect);

const HorizontalCustomersSelect = wrapHorizontalFormGroup(CustomersSelectContainer);
const VerticalCustomersSelect   = wrapVerticalFormGroup(CustomersSelectContainer);

export { CustomersSelectContainer as CustomersSelect, HorizontalCustomersSelect, VerticalCustomersSelect };