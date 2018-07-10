import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import Select, { Option } from 'react-select';
import { WrappedFieldProps } from 'redux-form';

import { Status } from 'model-types';
import { selectCurrentOrganizationId } from 'services/organizations';
import {
  Category, CategoryType,
  loadCategories,
  selectCategoriesStatus, selectTypedCategories,
} from 'services/categories';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group.jsx';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

import 'react-select/dist/react-select.css';
import 'components/utils/form-inputs/async-select-fix.css';

interface OwnProps {
  type:        CategoryType;
  emptyTitle?: string;
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

  handleChange = (value: Option<string>) => {
    this.props.input.onChange(value && value.value);
  }

  options = (): Option[] => {
    const { status, categories, emptyTitle } = this.props;
    if (status !== Status.Success || !categories) { return []; }

    return (emptyTitle ? [{ value: '', label: emptyTitle }] : [])
      .concat(categories.map(c => ({ value: String(c.id), label: c.name })));
  }

  render() {
    const { orgId, type, input, meta, status, ...inputProps } = this.props;

    return (
      <Select
        { ...inputProps }
        name={ input.name }
        value={ String(input.value) }
        onChange={ this.handleChange }
        onBlur={ () => input.onBlur(input.value) }
        isLoading={ status !== Status.Success }
        options={ this.options() }
      />
    );
  }
}

const mapState = (state: {}, props: OwnProps) => ({
  orgId:      selectCurrentOrganizationId(state),
  status:     selectCategoriesStatus(state),
  categories: selectTypedCategories(state, props.type),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => new Promise((res, rej) => dispatch(loadCategories(orgId, res, rej))),
});

const CategoriesSelectContainer =
  connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch)(CategoriesSelect);

const HorizontalCategoriesSelect = wrapHorizontalFormGroup(CategoriesSelectContainer);
const VerticalCategoriesSelect   = wrapVerticalFormGroup(CategoriesSelectContainer);

export { CategoriesSelectContainer as CategoriesSelect, HorizontalCategoriesSelect, VerticalCategoriesSelect };
