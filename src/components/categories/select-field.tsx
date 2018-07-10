import * as React from 'react';
import { connect } from 'react-redux';
import Select, { Option } from 'react-select';
import { WrappedFieldProps } from 'redux-form';
import { Query } from 'react-apollo';

import {
  CategoryFragment,
  CategoryType,
  GetOrganizationTypedCategoriesQuery,
  GetOrganizationTypedCategoriesQueryVariables,
} from 'graphql-types';
import { selectCurrentOrganizationId } from 'services/organizations';
import { GetOrganizationTypedCategories } from 'services/categories/queries';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group.jsx';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

import 'react-select/dist/react-select.css';
import 'components/utils/form-inputs/async-select-fix.css';

class CategoriesQuery extends
  Query<GetOrganizationTypedCategoriesQuery, GetOrganizationTypedCategoriesQueryVariables> {}

interface OwnProps {
  type:        CategoryType;
  emptyTitle?: string;
}

interface StateProps {
  orgId: number;
}

type Props = OwnProps & WrappedFieldProps & StateProps;

class CategoriesSelect extends React.Component<Props> {
  handleChange = (value: Option<string>) => {
    this.props.input.onChange(value && value.value);
  }

  options = (categories?: CategoryFragment[] | null): Option[] => {
    const { emptyTitle } = this.props;

    if (!categories) { return []; }

    return (emptyTitle ? [{ value: '', label: emptyTitle }] : [])
      .concat(categories.map(c => ({ value: String(c.id), label: c.name })));
  }

  render() {
    const { orgId, type, input, meta, ...inputProps } = this.props;

    return (
      <CategoriesQuery
        query={ GetOrganizationTypedCategories }
        variables={ { orgId: String(orgId), type } }
        fetchPolicy="cache-and-network"
      >
        {
          ({ loading, error, data }) => (
            <Select
              { ...inputProps }
              name={ input.name }
              value={ String(input.value) }
              onChange={ this.handleChange }
              onBlur={ () => input.onBlur(input.value) }
              isLoading={ loading }
              options={ this.options(data && data.categories) }
            />
          )
        }
      </CategoriesQuery>
    );
  }
}

const mapState = (state: {}) => ({
  orgId: selectCurrentOrganizationId(state),
});

const CategoriesSelectContainer =
  connect<StateProps, {}, OwnProps>(mapState)(CategoriesSelect);

const HorizontalCategoriesSelect = wrapHorizontalFormGroup(CategoriesSelectContainer);
const VerticalCategoriesSelect   = wrapVerticalFormGroup(CategoriesSelectContainer);

export { CategoriesSelectContainer as CategoriesSelect, HorizontalCategoriesSelect, VerticalCategoriesSelect };
