import * as React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface IProps {
  to: string;
}

const CrumbItem: React.SFC<IProps> = ({ to, ...props }) => (
  <LinkContainer to={ to }>
    <Breadcrumb.Item { ...props }/>
  </LinkContainer>
);

export default CrumbItem;
