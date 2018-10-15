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
  type?:    CategoryType;
  isMulti?: boolean;
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

  private handleChange = (values: ICategory | ICategory[]) => {
    if (values instanceof Array) {
      this.props.input.onChange(values.map(v => v.id));
    } else {
      this.props.input.onChange(values && values.id);
    }
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
    const { orgId, type, isMulti, input, meta, status, categories, ...inputProps } = this.props;

    let selectedCategory = null;
    if (input.value && status === Status.Success && categories) {
      if (input.value instanceof Array) {
        selectedCategory = categories.filter(c => input.value.includes(c.id));
      } else {
        selectedCategory = categories.find(c => c.id === input.value);
      }
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
        isMulti={ isMulti }
      />
    );
  }
}

const mapState = (state: IGlobalState, props: IOwnProps): IStateProps => ({
  orgId:      selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
  status:     selectCategoriesStatus(state),
  categories: selectCategories(state, props.type),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: (orgId: number) => new Promise((res, rej) => dispatch(loadCategories(orgId, res, rej))),
});

const CategoriesSelectContainer =
  connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(CategoriesSelect);

const HorizontalCategoriesSelect = wrapHorizontalFormGroup<IOwnProps & WrappedFieldProps>(CategoriesSelectContainer);
const VerticalCategoriesSelect   = wrapVerticalFormGroup<IOwnProps & WrappedFieldProps>(CategoriesSelectContainer);
const NoLabelCategoriesSelect    = wrapNoLabelFormGroup<IOwnProps & WrappedFieldProps>(CategoriesSelectContainer);

export {
  CategoriesSelectContainer as CategoriesSelect,
  HorizontalCategoriesSelect,
  VerticalCategoriesSelect,
  NoLabelCategoriesSelect,
};
