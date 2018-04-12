import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Async, Option } from 'react-select';
import { WrappedFieldProps } from 'redux-form';

import { Category } from 'model-types';
import { loadCategories } from 'actions/categories.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group.jsx';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

import 'react-select/dist/react-select.css';
import 'components/utils/form-inputs/async-select-fix.css';

interface OwnProps {
  emptyTitle?: string;
  type: string;
}

interface StateProps {
  orgId: number;
}

interface DispatchProps {
  load: (orgId: number) => Promise<Category[]>;
}

type Props = OwnProps & WrappedFieldProps & StateProps & DispatchProps;

const CategoriesSelect: React.SFC<Props> = ({ orgId, input, load, emptyTitle, type, ...inputProps }) => {
  const loadOptions = () => (
    load(orgId).then((categories) => ({
      options: (emptyTitle ? [{ value: '', label: emptyTitle }] : [])
        .concat(categories.filter((item) => item.type === type).map(c => ({ value: String(c.id), label: c.name })))
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
  load: (orgId: number) => new Promise<Category[]>((res, rej) => dispatch(loadCategories(orgId, res, rej))),
});

const CategoriesSelectContainer =
  connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch)(CategoriesSelect);

const HorizontalCategoriesSelect = wrapHorizontalFormGroup(CategoriesSelectContainer);
const VerticalCategoriesSelect   = wrapVerticalFormGroup(CategoriesSelectContainer);

export { CategoriesSelectContainer as CategoriesSelect, HorizontalCategoriesSelect, VerticalCategoriesSelect };
