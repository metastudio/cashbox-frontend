import * as React from 'react';

import Select from 'react-select';
import { WrappedFieldProps } from 'redux-form';

import { wrapNoLabelFormGroup } from 'components/utils/form-inputs/no-label-form-group';

type IProps = WrappedFieldProps;

interface IOption {
  value: string;
  label: string;
}

const periods: IOption[] = [
  { value: 'current-month',   label: 'Current month' },
  { value: 'last-month',      label: 'Last month' },
  { value: 'last-3-months',   label: 'Last 3 months' },
  { value: 'current-quarter', label: 'Current quarter' },
  { value: 'last-quarter',    label: 'Last quarter' },
  { value: 'current-year',    label: 'Current year' },
  { value: 'last-year',       label: 'Last year' },
  { value: 'custom',          label: 'Custom' },
];

class FilterPeriodSelect extends React.Component<IProps> {
  private handleChange = (period: IOption) => {
    this.props.input.onChange(period && period.value);
  }

  private styles = () => ({
    menu: (styles: {}) => ({
      ...styles,
      zIndex: 3,
    }),
  })

  public render() {
    const { input, meta, ...inputProps } = this.props;

    let selectedPeriod = null;
    if (input.value) {
      selectedPeriod = periods.find(p => p.value === input.value);
    }

    return (
      <Select<IOption>
        isClearable
        { ...inputProps }
        name={ input.name }
        value={ selectedPeriod }
        onChange={ this.handleChange }
        options={ periods }
        styles={ this.styles() }
      />
    );
  }
}

const NoLabelFilterPeriodSelect = wrapNoLabelFormGroup(FilterPeriodSelect);

export {
  FilterPeriodSelect,
  NoLabelFilterPeriodSelect,
};
