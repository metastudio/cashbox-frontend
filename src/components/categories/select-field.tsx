import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import { WrappedFieldProps } from 'redux-form';

import { Status } from 'model-types';
import { selectCurrentOrganizationId } from 'services/organizations';
import {
  Category, CategoryType,
  loadCategories,
  selectCategoriesStatus, selectCategories,
} from 'services/categories';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

interface OwnProps {
  type: CategoryType;
}

interface StateProps {
  orgId:      number;
  status:     Status;
  categories: Category[] | null;
}

interface DispatchProps {
  load: (orgId: number) => void;
}

type Props = OwnProps & WrappedFieldProps & StateProps & DispatchProps;

class CategoriesSelect extends React.Component<Props> {
  loadData = () => {
    const { status, load, orgId } = this.props;

    if (status === Status.Invalid) {
      load(orgId);
    }
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  handleChange = (category: Category) => {
    this.props.input.onChange(category && String(category.id));
  }

  options = (): Category[] => {
    const { status, categories } = this.props;
    if (status !== Status.Success || !categories) { return []; }

    return categories;
  }

  styles = () => ({
    menu: (styles: {}) => ({
      ...styles,
      zIndex: 3,
    })
  })

  render() {
    const { orgId, type, input, meta, status, categories, ...inputProps } = this.props;

    let selectedCategory = undefined;
    if (input.value && status === Status.Success && categories) {
      selectedCategory = categories.find((c) => String(c.id) === String(input.value));
    }

    return (
      <Select<Category>
        { ...inputProps }
        name={ input.name }
        value={ selectedCategory }
        onChange={ this.handleChange }
        isLoading={ status !== Status.Success }
        options={ this.options() }
        styles={ this.styles() }
        getOptionLabel={ (c) => c.name }
        getOptionValue={ (c) => String(c.id) }
      />
    );
  }
}

const mapState = (state: {}, props: OwnProps) => ({
  orgId:      selectCurrentOrganizationId(state),
  status:     selectCategoriesStatus(state),
  categories: selectCategories(state, props.type),
});

const mapDispatch = (dispatch: Dispatch) => ({
  load: (orgId: number) => new Promise((res, rej) => dispatch(loadCategories(orgId, res, rej))),
});

const CategoriesSelectContainer =
  connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch)(CategoriesSelect);

const HorizontalCategoriesSelect = wrapHorizontalFormGroup(CategoriesSelectContainer);
const VerticalCategoriesSelect   = wrapVerticalFormGroup(CategoriesSelectContainer);

export { CategoriesSelectContainer as CategoriesSelect, HorizontalCategoriesSelect, VerticalCategoriesSelect };
