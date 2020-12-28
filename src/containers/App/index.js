/* eslint-disable import/order */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
import { withStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalLoading from '../../components/GlobalLoading';
import Modal from '../../components/Modal';
import configureStore from '../../redux/configureStore';
import theme from '../../utils/commons/themes';
import styles from './styles.js';
import 'assets/styles/reduction.scss';

import {
  renderAdminRoutes,
  renderDefaultRoutes,
  renderMainRoutes,
  renderLoginRoutes,
} from './renderRoute';

const store = configureStore();

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastContainer />
            <GlobalLoading />
            <Modal />
            <Switch>
              {renderAdminRoutes()}
              {renderLoginRoutes()}
              {renderMainRoutes()}
              {renderDefaultRoutes()}
            </Switch>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
