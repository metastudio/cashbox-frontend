import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import { GroupedOptionsType } from 'react-select/lib/types';
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
import { wrapNoLabelFormGroup } from '../utils/form-inputs/no-label-form-group';

interface IOwnProps {
  type?: CategoryType;
}

interface IStateProps {
  orgId:      number;
  status:     Status;
  categories: ICategory[];
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
    this.props.input.onChange(category && category.id);
  }

  private options = (): GroupedOptionsType<ICategory> | ICategory[] => {
    const { status, categories, type } = this.props;
    if (status !== Status.Success) { return []; }

    if (type) {
      return categories;
    }

    return [CategoryType.Income, CategoryType.Expense].map(t => ({
      label: t,
      options: categories.filter(c => c.type === t),
    }));
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
      selectedCategory = categories.find(c => c.id === input.value);
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
const NoLabelCategoriesSelect    = wrapNoLabelFormGroup(CategoriesSelectContainer);

export {
  CategoriesSelectContainer as CategoriesSelect,
  HorizontalCategoriesSelect,
  VerticalCategoriesSelect,
  NoLabelCategoriesSelect,
};
