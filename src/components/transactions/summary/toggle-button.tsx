import * as React from 'react';

import { Fa } from 'components/utils/fa';

interface IProps {
  visible:  boolean;
  onToggle: () => void;
}

class TransactionsSummaryToggleButton extends React.PureComponent<IProps> {
  private handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    this.props.onToggle();
  }

  public render () {
    const { visible } = this.props;

    return (
      <div className="transactions-summary-toggle-button">
        <a href="#" role="button" onClick={ this.handleClick }>
          <Fa icon={ visible ? 'caret-down' : 'caret-up' } />
        </a>
      </div>
    );
  }
}

export default TransactionsSummaryToggleButton;
