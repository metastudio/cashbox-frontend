import * as React from 'react';

import { ID } from 'model-types';

import Context from './context';

interface ICurrentOrgIdProps {
  orgId: ID;
}

const withCurrentOrgId = <P extends ICurrentOrgIdProps>(Component: React.ComponentType<P>) => {
  class WithCurrentOrgId extends React.PureComponent<P & ICurrentOrgIdProps> {
    public static displayName = `WithCurrentOrgId(${Component.displayName || Component.name || 'Component'})`;

    public render() {
      return (
        <Context.Consumer>
          { ({ orgId }) => <Component { ...this.props } orgId={ orgId! } /> }
        </Context.Consumer>
      );
    }
  }

  return WithCurrentOrgId;
};

export { withCurrentOrgId, ICurrentOrgIdProps };
