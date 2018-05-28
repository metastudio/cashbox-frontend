import * as React from 'react';
import { connect } from 'react-redux';
import Select, { Option } from 'react-select';
import { WrappedFieldProps } from 'redux-form';
import { Query } from 'react-apollo';

import {
  CategoryFragment,
  GetOrganizationCategoriesQuery,
  GetOrganizationCategoriesQueryVariables,
} from 'graphql-types';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { GetOrganizationCategories } from 'queries/categories';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group.jsx';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

import 'react-select/dist/react-select.css';
import 'components/utils/form-inputs/async-select-fix.css';

class OrganizationCategoriesQuery extends
  Query<GetOrganizationCategoriesQuery, GetOrganizationCategoriesQueryVariables> {}

interface OwnProps {
  emptyTitle?: string;
  type:        string;
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
    const { emptyTitle, type } = this.props;

    if (!categories) { return []; }

    const typedCategories = categories.filter((item) => item.type === type);

    return (emptyTitle ? [{ value: '', label: emptyTitle }] : [])
      .concat(typedCategories.map(c => ({ value: String(c.id), label: c.name })));
  }

  render() {
    const { orgId, input, meta, ...inputProps } = this.props;

    return (
      <OrganizationCategoriesQuery
        query={ GetOrganizationCategories }
        variables={ { orgId: String(orgId) } }
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
      </OrganizationCategoriesQuery>
    );
  }
}

const mapState = (state: {}) => ({
  orgId: getCurrentOrganizationId(state),
});

const CategoriesSelectContainer =
  connect<StateProps, {}, OwnProps>(mapState)(CategoriesSelect);

const HorizontalCategoriesSelect = wrapHorizontalFormGroup(CategoriesSelectContainer);
const VerticalCategoriesSelect   = wrapVerticalFormGroup(CategoriesSelectContainer);

export { CategoriesSelectContainer as CategoriesSelect, HorizontalCategoriesSelect, VerticalCategoriesSelect };
