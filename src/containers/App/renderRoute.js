/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import PageSpinner from 'components/PageSpinner';
import AdminLayoutRoute from '../../components/Layout/AdminLayoutRoute';
import { ADMIN_ROUTES, DEFAULT_ROUTES } from 'utils/constants/systems/navigation';
import 'assets/styles/reduction.scss';
import DefaultLayoutRoute from '../../components/Layout/DefaultLayoutRoute';
import { MainLayout } from 'components/Layout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const AlertPage = React.lazy(() => import('containers/PAGES/AlertPage'));
const AuthModalPage = React.lazy(() =>
  import('containers/PAGES/AuthModalPage'),
);
const BadgePage = React.lazy(() => import('containers/PAGES/BadgePage'));
const ButtonGroupPage = React.lazy(() =>
  import('containers/PAGES/ButtonGroupPage'),
);
const ButtonPage = React.lazy(() => import('containers/PAGES/ButtonPage'));
const CardPage = React.lazy(() => import('containers/PAGES/CardPage'));
const ChartPage = React.lazy(() => import('containers/PAGES/ChartPage'));
const DashboardPage = React.lazy(() =>
  import('containers/PAGES/DashboardPage'),
);
const DropdownPage = React.lazy(() => import('containers/PAGES/DropdownPage'));
const FormPage = React.lazy(() => import('containers/PAGES/FormPage'));
const InputGroupPage = React.lazy(() =>
  import('containers/PAGES/InputGroupPage'),
);
const ModalPage = React.lazy(() => import('containers/PAGES/ModalPage'));
const ProgressPage = React.lazy(() => import('containers/PAGES/ProgressPage'));
const TablePage = React.lazy(() => import('containers/PAGES/TablePage.jsx'));
const TypographyPage = React.lazy(() =>
  import('containers/PAGES/TypographyPage'),
);
const HeaderPage = React.lazy(() => import('containers/PAGES/HeaderPage'));
const FooterPage = React.lazy(() => import('containers/PAGES/FooterPage'));
const ProductPage = React.lazy(() => import('containers/PAGES/ProductPage/index'));
const ProductInputGroupPage = React.lazy(() => import('containers/PAGES/ProductPage/inputGroup'));
const ProductCategoryPage = React.lazy(() =>
  import('containers/PAGES/ProductCategoryPage'),
);
const WidgetPage = React.lazy(() => import('containers/PAGES/WidgetPage'));

export const renderAdminRoutes = () => {
  let xhtml = null;
  xhtml = ADMIN_ROUTES.map(route => {
    return (
      <AdminLayoutRoute
        key={route.path}
        path={route.path}
        component={route.component}
        exact={route.exact}
        name={route.name}
      />
    );
  });
  return xhtml;
};

export const renderLoginRoutes = () => {
  let xhtml = null;
  xhtml = DEFAULT_ROUTES.map(route => {
    return (
      <DefaultLayoutRoute
        key={route.path}
        path={route.path}
        component={route.component}
        exact={route.exact}
        name={route.name}
      />
    );
  });
  return xhtml;
};

export const renderDefaultRoutes = () => {
  let xhtml = null;
  xhtml = DEFAULT_ROUTES.map(route => {
    return (
      <DefaultLayoutRoute
        key={route.path}
        path="/"
        component={route.component}
        exact={route.exact}
        name={route.name}
      />
    );
  });
  return xhtml;
};

export const renderMainRoutes = () => {
  let xhtml = null;
  xhtml = (
    <MainLayout>
      <React.Suspense fallback={<PageSpinner />}>
        <Route exact path="/" component={DashboardPage} />
        {/* <Route exact path="/login-modal" component={AuthModalPage} />
        <Route exact path="/buttons" component={ButtonPage} />
        <Route exact path="/cards" component={CardPage} />
        <Route exact path="/widgets" component={WidgetPage} />
        <Route exact path="/typography" component={TypographyPage} />
        <Route exact path="/headers" component={HeaderPage} />
        <Route exact path="/footers" component={FooterPage} /> */}
        <Route exact path="/products" component={ProductPage} />
        <Route exact path="/products/:params" component={ProductInputGroupPage} />
        <Route exact path="/product/create" component={ProductInputGroupPage} />
        {/* <Route
          exact
          path="/productCategories"
          component={ProductCategoryPage}
        /> */}
        {/* <Route exact path="/alerts" component={AlertPage} />
        <Route exact path="/tables" component={TablePage} />
        <Route exact path="/badges" component={BadgePage} />
        <Route exact path="/button-groups" component={ButtonGroupPage} />
        <Route exact path="/dropdowns" component={DropdownPage} />
        <Route exact path="/progress" component={ProgressPage} />
        <Route exact path="/modals" component={ModalPage} />
        <Route exact path="/forms" component={FormPage} />
        <Route exact path="/input-groups" component={InputGroupPage} />
        <Route exact path="/charts" component={ChartPage} /> */}
      </React.Suspense>
    </MainLayout>
  );
  return xhtml;
};
