import * as React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { formatMoney } from 'utils/money';
import { Debtor } from 'services/debtors/types';
import TooltipText from './tooltip-text';

interface Props {
  debtor: Debtor;
}

const tooltip = (debtor: Debtor) => {
  return(
    <Tooltip id="tooltip">
      <TooltipText debtor={ debtor } />
    </Tooltip>
  );
};

const ConvertedDebt: React.SFC<Props> = ({ debtor }) => (
  <td className="text-right">
    { formatMoney(debtor.amount.oldAmount) }
    { ' ' }
    <OverlayTrigger
      overlay={ tooltip(debtor) }
      placement="top"
    >
      <i
        className="fa fa-question-circle"
      />
    </OverlayTrigger>
  </td>
);

export default ConvertedDebt;
