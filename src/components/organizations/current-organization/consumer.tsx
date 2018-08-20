import * as React from 'react';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

import { ID } from 'model-types';

import Context from './context';

interface ICurrentOrgIdProps {
  orgId: ID;
}

const withCurrentOrgId = <P extends ICurrentOrgIdProps>(Component: React.ComponentType<P>) => {
  class WithCurrentOrgId extends React.PureComponent<Omit<P, keyof ICurrentOrgIdProps>> {
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
