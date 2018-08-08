import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import { WrappedFieldProps } from 'redux-form';

import { Status } from 'model-types';
import { selectCurrentOrganizationId } from 'services/organizations';
import {
  ICategory, CategoryType,
  loadCategories,
  selectCategoriesStatus, selectCategories,
} from 'services/categories';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

interface IOwnProps {
  type: CategoryType;
}

interface IStateProps {
  orgId:      number;
  status:     Status;
  categories: ICategory[] | null;
}

interface IDispatchProps {
  load: (orgId: number) => void;
}

type IProps = IOwnProps & WrappedFieldProps & IStateProps & IDispatchProps;

class CategoriesSelect extends React.Component<IProps> {
  private loadData = () => {
    const { status, load, orgId } = this.props;

    if (status === Status.Invalid) {
      load(orgId);
    }
  }

  private handleChange = (category: ICategory) => {
    this.props.input.onChange(category && String(category.id));
  }

  private options = (): ICategory[] => {
    const { status, categories } = this.props;
    if (status !== Status.Success || !categories) { return []; }

    return categories;
  }

  private styles = () => ({
    menu: (styles: {}) => ({
      ...styles,
      zIndex: 3,
    }),
  })

  private formatLabel = (c: ICategory) => c.name;
  private formatValue = (c: ICategory) => String(c.id);

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate() {
    this.loadData();
  }

  public render() {
    const { orgId, type, input, meta, status, categories, ...inputProps } = this.props;

    let selectedCategory;
    if (input.value && status === Status.Success && categories) {
      selectedCategory = categories.find(c => String(c.id) === String(input.value));
    }

    return (
      <Select<ICategory>
        { ...inputProps }
        name={ input.name }
        value={ selectedCategory }
        onChange={ this.handleChange }
        isLoading={ status !== Status.Success }
        options={ this.options() }
        styles={ this.styles() }
        getOptionLabel={ this.formatLabel }
        getOptionValue={ this.formatValue }
      />
    );
  }
}

const mapState = (state: {}, props: IOwnProps) => ({
  orgId:      selectCurrentOrganizationId(state),
  status:     selectCategoriesStatus(state),
  categories: selectCategories(state, props.type),
});

const mapDispatch = (dispatch: Dispatch) => ({
  load: (orgId: number) => new Promise((res, rej) => dispatch(loadCategories(orgId, res, rej))),
});

const CategoriesSelectContainer =
  connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(CategoriesSelect);

const HorizontalCategoriesSelect = wrapHorizontalFormGroup(CategoriesSelectContainer);
const VerticalCategoriesSelect   = wrapVerticalFormGroup(CategoriesSelectContainer);

export { CategoriesSelectContainer as CategoriesSelect, HorizontalCategoriesSelect, VerticalCategoriesSelect };
