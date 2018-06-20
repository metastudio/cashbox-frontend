import { filter } from 'lodash';

import { Rate } from 'model-types';

const findRate = (rates: Rate[], from: string, to: string) => {
  const rate = filter(rates, (r: Rate) => {
    return(r.from.isoCode === from && r.to.isoCode === to);
  })[0];
  return rate;
};

export { findRate };
