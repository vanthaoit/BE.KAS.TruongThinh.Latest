/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';
import { parseJSON } from 'utils/tools/JSONConvert';
import renderTextField from '../../components/FormHelper/TextField';
import styles from './styles';
import validate from './validate';
import * as authActions from '../../actions/auth';

class LoginPage extends React.Component {
  handleSubmitFormLogin = data => {
    // eslint-disable-next-line no-debugger
    debugger;
    const { target } = data;
    const requestData = parseJSON(target);
    const email = requestData.email === 'vietnamthaotranvan@gmail.com';
    const pass = requestData.password === 'Admin@2021';
    if (email && pass) {
      sessionStorage.setItem(
        'TruongThinhPassword',
        `${requestData.email}ooo0ooo${requestData.password}`,
      );
      // eslint-disable-next-line react/destructuring-assignment
      this.props.history.push('/');
    } else {
      console.log('data is not valid');
    }
  };

  render() {
    const { classes, handleSubmit, invalid } = this.props;
    const abc = 1;
    return (
      <form onSubmit={this.handleSubmitFormLogin}>
        <div className={classes.background}>
          <div className={classes.login}>
            <Card>
              <CardContent>
                {/* <div className="text-xs-center pb-xs">
                  <img src="/static/images/logo-dark.svg" alt="" />
                  <Typography variant="caption">
                    Sign in with your app id to continue.
                  </Typography>
                </div> */}
                <Field
                  id="email"
                  label="Email"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  name="email"
                  component={renderTextField}
                />
                <Field
                  id="password"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  fullWidth
                  margin="normal"
                  name="password"
                  component={renderTextField}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  disabled={invalid}
                >
                  Login
                </Button>
                <div className="pt-1 text-md-center">
                  <Link to="/signup">
                    <Button>Create new account.</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    );
  }
}

const FORM_NAME = 'LOGIN';
const withForm = reduxForm({
  form: FORM_NAME,
  validate,
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  // mapDispatchToProps,
);
LoginPage.propTypes = {
  classes: PropTypes.object,
};
export default compose(
  withStyles(styles),
  withConnect,
  withForm,
)(LoginPage);
