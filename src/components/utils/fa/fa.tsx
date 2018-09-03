import * as React from 'react';

interface IProps {
  icon: string;
}

const Fa: React.SFC<IProps> = ({ icon }) => <i className={ `fa fa-${icon}` } />;

export { Fa, IProps as IFaProps };
