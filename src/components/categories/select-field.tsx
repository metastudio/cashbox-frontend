import * as React from 'react';

import { connect } from 'react-redux';
import Select from 'react-select';
import { GroupedOptionsType } from 'react-select/lib/types';
import { Dispatch } from 'redux';
import { WrappedFieldProps } from 'redux-form';

import { Status } from 'model-types';
import {
  CategoryType, ICategory,
  loadCategories,
  selectCategories, selectCategoriesStatus,
} from 'services/categories';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group';
import { wrapNoLabelFormGroup } from 'components/utils/form-inputs/no-label-form-group';
import { ReactSelectStyles } from 'components/utils/form-inputs/react-select-styles';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

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

    let selectedCategory = null;
    if (input.value && status === Status.Success && categories) {
      selectedCategory = categories.find(c => c.id === input.value);
    }

    return (
      <Select<ICategory>
        isClearable
        { ...inputProps }
        name={ input.name }
        value={ selectedCategory }
        onChange={ this.handleChange }
        isLoading={ status !== Status.Success }
        options={ this.options() }
        styles={ ReactSelectStyles }
        getOptionLabel={ this.formatLabel }
        getOptionValue={ this.formatValue }
      />
    );
  }
}

const mapState = (state: IGlobalState, props: IOwnProps) => ({
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
