import React from 'react';
import { Route } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const LayoutRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

export default LayoutRoute;
