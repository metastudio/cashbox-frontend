import * as React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Money, formatMoney, convertMoney } from 'utils/money';
import { Rate } from 'model-types';
import { findRate } from 'utils/rates';

interface Props {
  debt:   Money;
  rates:  Rate[];
  to:     string;
  by:     string;
}

const tooltip = (message: string) => {
  return(
    <Tooltip id="tooltip">
      { message }
    </Tooltip>
  );
};

const ConvertedDebt: React.SFC<Props> = ({debt, rates, to, by}) => {
  const from = debt.currency.isoCode;
  const rate = findRate(rates, from, to);
  const message = `${from}/${to}, rate: ${rate.value}, by ${by}`;

  return(
    <>
      { ' ' }
      { formatMoney(debt) }
      { ' (' }
      { formatMoney(convertMoney(debt, to, rate)) }
      { ' ' }
      <OverlayTrigger
        overlay={ tooltip(message) }
        placement="top"
      >
        <span
          className="glyphicon glyphicon-question-sign"
        />
      </OverlayTrigger>
      { ') ' }
    </>
  );
};

export default ConvertedDebt;
