import * as React from 'react';
import Spinner from '../spinner';

function asyncComponent<P = {}>(
  importComponent: () => Promise<{ default: React.ComponentClass<P> | React.StatelessComponent<P> }>,
) {
  interface IState {
    component: React.ComponentClass<P> | React.StatelessComponent<P> | null;
  }

  class AsyncComponent extends React.Component<P, IState> {
    public state = {
      component: null,
    };

    public async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({ component });
    }

    public render() {
      if (!this.state.component) {
        return <Spinner />;
      }

      const C: React.ComponentClass<P> = this.state.component!;

      return <C { ...this.props } />;
    }
  }

  return AsyncComponent;
}

export default asyncComponent;
