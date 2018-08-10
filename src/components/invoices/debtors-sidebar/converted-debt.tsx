import * as React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { formatMoney, IConvertedAmount } from 'utils/money';
import TooltipText from './tooltip-text';

interface IProps {
  amount: IConvertedAmount;
}

const tooltip = (amount: IConvertedAmount) => {
  return(
    <Tooltip id="tooltip">
      <TooltipText amount={ amount } />
    </Tooltip>
  );
};

const ConvertedDebt: React.SFC<IProps> = ({ amount }) => (
  <td className="text-right">
    { formatMoney(amount.oldAmount) }
    { ' ' }
    <OverlayTrigger
      overlay={ tooltip(amount) }
      placement="top"
    >
      <i
        className="fa fa-question-circle"
      />
    </OverlayTrigger>
  </td>
);

export default ConvertedDebt;
