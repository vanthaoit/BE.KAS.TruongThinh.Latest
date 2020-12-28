import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';
import renderTextField from '../../components/FormHelper/TextField';
import renderCheckbox from '../../components/FormHelper/Checkbox';
import styles from './styles';
import validate from './validate';
import * as authActions from '../../actions/auth';

class SignupPage extends Component {
  handleSubmitForm = values => {
    if (values) {
      const { email, password } = values;
      // const { authActions } = this.props;
      // const { signup } = authActions;
      // if (signup) {
      //   signup(email, password);
      // }
    } else {
      console.log('data is not valid');
    }
  };

  render() {
    const { classes, handleSubmit, invalid, submitting } = this.props;
    return (
      <div className={classes.background}>
        <div className={classes.wrapper}>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit(this.handleSubmitForm)}>
                <div className="text-xs-center pb-xs">
                  <img src="/static/images/logo-dark.svg" alt="" />
                  <Typography variant="caption">
                    Sign up with your app id to continue.
                  </Typography>
                </div>
                <Field
                  className={classes.textField}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  component={renderTextField}
                />
                <Field
                  className={classes.textField}
                  fullWidth
                  label="Password"
                  margin="normal"
                  name="password"
                  component={renderTextField}
                  type="password"
                />
                <Field
                  className={classes.textField}
                  fullWidth
                  label="Confirm Password"
                  margin="normal"
                  name="confirmpassword"
                  component={renderTextField}
                  type="password"
                />

                <FormControlLabel
                  control={<Checkbox value="agree" />}
                  label="I have read and agree to the terms of service."
                  className={classes.fullWidth}
                  name="isAccept"
                />
                <Button
                  disabled={invalid || submitting}
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Create account
                </Button>
                <div className="pt-1 text-md-center">
                  <Link to="/login">
                    <Button>Already account.</Button>
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

SignupPage.propTypes = {
  classes: PropTypes.object,
};
export default compose(
  withStyles(styles),
  withConnect,
  withForm,
)(SignupPage);
