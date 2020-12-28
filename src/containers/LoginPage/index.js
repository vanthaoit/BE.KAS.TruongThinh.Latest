import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';
import renderTextField from '../../components/FormHelper/TextField';
import styles from './styles';
import validate from './validate';
import * as authActions from '../../actions/auth';

class LoginPage extends Component {
  handleSubmitForm = values => {
    if (values) {
      const { email, password } = values;
      // const { authActions } = this.props;
      // const { login } = authActions;
      // if (login) {
      //   login(email, password);
      // }
    } else {
      console.log('data is not valid');
    }
  };

  render() {
    const { classes, handleSubmit, invalid, submitting } = this.props;
    return (
      <div className={classes.background}>
        <div className={classes.login}>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit(this.handleSubmitForm)}>
                <div className="text-xs-center pb-xs">
                  <img src="/static/images/logo-dark.svg" alt="" />
                  <Typography variant="caption">
                    Sign in with your app id to continue.
                  </Typography>
                </div>
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
                  disabled={invalid || submitting}
                >
                  Login
                </Button>
                <div className="pt-1 text-md-center">
                  <Link to="/signup">
                    <Button>Create new account.</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
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
  mapDispatchToProps,
);
LoginPage.propTypes = {
  classes: PropTypes.object,
};
export default compose(
  withStyles(styles),
  withConnect,
  withForm,
)(LoginPage);
