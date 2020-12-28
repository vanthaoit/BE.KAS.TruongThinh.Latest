import React from 'react';
import { Content } from '../../Layout';

// eslint-disable-next-line react/prop-types
const EmptyLayout = ({ children, ...restProps }) => (
  <main className="cr-app bg-light" {...restProps}>
    <Content fluid>{children}</Content>
  </main>
);

export default EmptyLayout;
