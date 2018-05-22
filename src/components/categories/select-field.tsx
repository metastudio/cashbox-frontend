import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import Select, { Option } from 'react-select';
import { WrappedFieldProps } from 'redux-form';

import { Status, Category } from 'model-types';
import { loadCategories } from 'actions/categories.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectCategories, selectCategoriesStatus } from 'selectors/categories.js';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group.jsx';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

import 'react-select/dist/react-select.css';
import 'components/utils/form-inputs/async-select-fix.css';

interface OwnProps {
  status:      Status;
  emptyTitle?: string;
  type:        string;
  categories?: Category[];
}

interface StateProps {
  orgId: number;
}

interface DispatchProps {
  load: (orgId: number) => void;
}

type Props = OwnProps & WrappedFieldProps & StateProps & DispatchProps;

class CategoriesSelect extends React.Component<Props> {
  loadData = (props: Props) => {
    if (props.status === Status.Invalid) {
      props.load(props.orgId);
    }
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(props: Props) {
    this.loadData(props);
  }

  handleChange = (value: Option<string>) => {
    this.props.input.onChange(value && value.value);
  }

  options = (): Option[] => {
    const { status, categories, emptyTitle, type } = this.props;

    if (status !== Status.Success || !categories) { return []; }

    const typedCategories = categories.filter((item) => item.type === type);

    return (emptyTitle ? [{ value: '', label: emptyTitle }] : [])
      .concat(typedCategories.map(c => ({ value: String(c.id), label: c.name })));
  }

  render() {
    const { orgId, status, input, meta, ...inputProps } = this.props;

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

const mapState = (state: {}) => ({
  orgId:      getCurrentOrganizationId(state),
  status:     selectCategoriesStatus(state),
  categories: selectCategories(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => dispatch(loadCategories(orgId)),
});

const CategoriesSelectContainer =
  connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch)(CategoriesSelect);

const HorizontalCategoriesSelect = wrapHorizontalFormGroup(CategoriesSelectContainer);
const VerticalCategoriesSelect   = wrapVerticalFormGroup(CategoriesSelectContainer);

export { CategoriesSelectContainer as CategoriesSelect, HorizontalCategoriesSelect, VerticalCategoriesSelect };
