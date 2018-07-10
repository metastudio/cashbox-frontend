import * as React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { formatMoney } from 'utils/money';
import { Debtor } from 'model-types';

interface Props {
  debtor: Debtor;
}

const tooltip = (message: string) => {
  return(
    <Tooltip id="tooltip">
      { message }
    </Tooltip>
  );
};

const ConvertedDebt: React.SFC<Props> = ({ debtor }) => {
  let message = `${formatMoney(debtor.amount.amount)}`;
  message += ` ${debtor.amount.oldAmount.currency.isoCode}/`;
  if (debtor.amount.amount) { message += `${debtor.amount.amount.currency.isoCode}`; }
  message += ` rate: ${debtor.amount.rate}`;
  message += ` by: ${debtor.amount.updatedAt}`;

  return(
    <td className="text-right">
      { formatMoney(debtor.amount.oldAmount) }
      { ' ' }
      <OverlayTrigger
        overlay={ tooltip(message) }
        placement="top"
      >
        <span
          className="glyphicon glyphicon-question-sign"
        />
      </OverlayTrigger>
    </td>
  );
};

export default ConvertedDebt;
