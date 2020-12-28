/* eslint-disable react/no-unused-prop-types */
/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import AdminLayoutRoute from 'components/Layout/AdminLayoutRoute';
import * as productActions from 'actions/product';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AdminHomePage extends Component {
  componentDidMount() {
    const { productActionCreators } = this.props;
    const { fetchListProduct } = productActionCreators;
    fetchListProduct();
  }

  render() {
    return (
      <div>
        <h1>Admin Home Page works!</h1>
      </div>
    );
  }
}
AdminHomePage.propTypes = {
  productActionCreators: PropTypes.shape({
    fetchListProduct: PropTypes.func,
    filterProduct: PropTypes.func,
    updateProduct: PropTypes.func,
    deleteProduct: PropTypes.func,
  }),
  listProduct: PropTypes.array,
};
const mapStateToProps = state => {
  return {
    //listProduct: state.product.listProduct,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    productActionCreators: bindActionCreators(productActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminHomePage);
