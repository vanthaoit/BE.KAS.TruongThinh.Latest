/* eslint-disable react/self-closing-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-template */
/* eslint-disable spaced-comment */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable import/no-unresolved */
import Page from 'components/Page';
import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
} from 'reactstrap';
import * as productActions from 'actions/product';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HTMLComponent } from 'react-typescript-raw-html';
import { Fab, CardActions, Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from './styles';

class ProductPage extends React.Component {
  componentWillMount() {
    const { productActionCreators } = this.props;
    const { fetchListProduct } = productActionCreators;
    fetchListProduct();
  }

  handleUpdateProduct = product => {
    const { productActionCreators, modalActionCreators } = this.props;
    const { setProductUpdating } = productActionCreators;

    setProductUpdating(product);
    //this.navigationDetail(this.productDetail);
    console.log(
      'productUpdating = ' + JSON.stringify(this.props.productDetail),
    );
    this.props.history.push('/products/' + product.id);
  };

  handleCreateProduct = () => {
    console.log(
      'product creating '
    );
    this.props.history.push('/product/create');
  };

  navigationDetail = details => {
    this.props.history.push(
      'product' + details !== undefined ? details.id : 'create',
    );
  };

  showModalDeleteProduct = product => {
    const { id } = product;
    const { productActionCreators } = this.props;
    const { deleteProduct } = productActionCreators;
    deleteProduct(id);
  };

  render() {
    const { listProduct, product } = this.props;
    //const { id, name, content, description } = product;
    return (
      <Page
        title="Products"
        breadcrumbs={[{ name: 'products', active: true }]}
        className="ProductPage"
      >
        <Row>
          <Col>
            <CardBody className="mb-3">
              <Button
                color="success"
                size="lg"
                onClick={() => this.handleCreateProduct()}
              >
                Create Product
              </Button>
            </CardBody>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>Size</CardHeader>
              <CardBody>
                <Table size="sm">
                  <thead>
                    <tr>
                      <th className="table-number">#</th>
                      <th className="table-name">Name</th>
                      <th className="table-content">Content</th>
                      <th className="table-description">Description</th>
                      <th className="table-status">Status</th>
                      <th className="table-actions">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listProduct.map((resp, idx) => {
                      return (
                        <tr key={idx}>
                          <th className="td-center" scope="row">
                            {resp.id}
                          </th>
                          <td className="td-center">{resp.name}</td>
                          <td className="td-center">
                            <HTMLComponent rawHTML={resp.content} />
                          </td>
                          <td className="td-center">
                            <HTMLComponent rawHTML={resp.description} />
                          </td>
                          <td>{resp.isActive === true ? 'true' : 'false'}</td>
                          <td className="td-center">
                            <CardActions className="">
                              <Fab
                                color="primary"
                                aria-label="Edit"
                                className=""
                                size="small"
                                onClick={() => this.handleUpdateProduct(resp)}
                              >
                                <Icon fontSize="small">edit_icon</Icon>
                              </Fab>
                              <Fab
                                color="primary"
                                aria-label="Delete"
                                className=""
                                size="small"
                                onClick={this.showModalDeleteProduct}
                              >
                                <Icon fontSize="small">delete_icon</Icon>
                              </Fab>
                            </CardActions>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
ProductPage.propTypes = {
  productActionCreators: PropTypes.shape({
    fetchListProduct: PropTypes.func,
    filterProduct: PropTypes.func,
    updateProduct: PropTypes.func,
    deleteProduct: PropTypes.func,
    setProductUpdating: PropTypes.func,
  }),
  modalActionCreators: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeModalTitle: PropTypes.func,
    changeModalContent: PropTypes.func,
  }),
  listProduct: PropTypes.array,
  productDetail: PropTypes.object,
};
const mapStateToProps = state => {
  return {
    listProduct: state.product.listProduct,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    productActionCreators: bindActionCreators(productActions, dispatch),
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProductPage),
);
