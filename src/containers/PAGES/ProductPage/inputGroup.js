/* eslint-disable spaced-comment */
/* eslint-disable radix */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-var */
/* eslint-disable dot-notation */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable operator-assignment */
/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-useless-constructor */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable no-const-assign */
/* eslint-disable no-debugger */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-unresolved */
import Page from 'components/Page';
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import PropTypes from 'prop-types';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import * as detailActions from 'actions/product';
import * as detailCategoryActions from 'actions/productCategory';
import * as detailXProductProductCategoryActions from 'actions/xproduct_productCategory';
import { bindActionCreators } from 'redux';
import { parseJSON } from 'utils/tools/JSONConvert';
import { WHIS, GET } from 'utils/constants/systems/APImethods';
import { convertToSlug } from 'utils/tools/convertToSlug';
import Notifications, { notify } from 'react-notify-toast';
import Spinner from 'components/Spinner';
import Images from 'components/Images';
import Buttons from 'components/Buttons';
import { parseImages } from 'utils/tools/parseImages';
import { changeAlias } from 'utils/tools/changeAlias';
import $ from 'jquery';
import styles from './styles';

const toastColor = {
  background: '#505050',
  text: '#fff',
};

let aliasChanged = '';
let isUpdate = true;
let hasCreate = 'Update';
let AddXCategory = false;
let CategoryId = 0;
class InputGroupPage extends React.Component {
  toast = notify.createShowQueue();

  state = {
    loading: true,
    loadingSingle: true,
    uploading: false,
    uploadingSingle: false,
    images: [],
    image: [],
    productCategory: 0,
  };

  constructor(props) {
    super(props);
    this.initial();
  }

  componentDidMount() {
    let currentUrl = window.location.pathname;
    let currentId = currentUrl.split('/');
    const {
      detailCategoryActionCreators,
      detailActionCreators,
      productDetail,
    } = this.props;
    const { fetchProductDetail, setProductUpdating } = detailActionCreators;
    const { fetchListProductCategory } = detailCategoryActionCreators;
    fetchListProductCategory();
  }

  goToProducts = () => {
    this.props.history.push('/products/');
  };
  // Images start

  updateState = (updateImage, updateMoreImages) => {
    let image = [];
    let moreImages = [];
    if (updateImage != null) image = updateImage.split(';');
    if (updateMoreImages != null) moreImages = updateMoreImages.split(';');
    this.state.images = moreImages;
    this.state.image = image;
  };

  onChange = e => {
    const errs = [];
    const files = Array.from(e.target.files);
    const type = e.target.id;

    if (files.length > 10) {
      const msg = 'Only 10 images can be uploaded at a time';
      return this.toast(msg, 'custom', 2000, toastColor);
    }

    const formData = new FormData();
    const types = ['image/png', 'image/jpeg', 'image/gif'];

    files.forEach((file, i) => {
      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`);
      }

      if (file.size > 150000000000000) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`);
      }

      formData.append('files', file, file.name);
    });

    if (errs.length) {
      return errs.forEach(err => this.toast(err, 'custom', 2000, toastColor));
    }

    if (type === 'single') this.setState({ uploadingSingle: true });
    else this.setState({ uploading: true });

    fetch(
      `https://apiservice.truongthinhmanufacture.com/api/Product/UploadImage`,
      {
        //fetch(`http://localhost:3500/api/Product/UploadImage`, {
        method: 'POST',
        body: formData,
      },
    )
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(images => {
        var image = [];
        var resp = images.map(x =>
          x.replace(/C:\\Inetpub\\vhosts/g, 'https:\\'),
        );
        resp = resp.map(x => x.replace(/\\httpdocs/g, ''));
        images = resp;

        if (type === 'single') {
          image = images;
          this.setState({
            uploadingSingle: false,
            image,
          });
        } else
          this.setState({
            uploading: false,
            images,
          });
      })
      .catch(err => {
        err.json().then(e => {
          this.toast(e.message, 'custom', 2000, toastColor);
          this.setState({ uploading: false });
        });
      });
  };

  filter = id => {
    return this.state.images.filter(image => image !== id);
  };

  filterSingle = id => {
    let resp = this.state.image.filter(image => image !== id);
    return resp;
  };

  removeImage = id => {
    this.setState({ images: this.filter(id) });
    this.setState({ image: this.filterSingle(id) });
  };

  onError = id => {
    this.toast('Oops, something went wrong', 'custom', 2000, toastColor);
    this.setState({ images: this.filter(id) });
  };

  handlePeriodChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // Images end

  initial = () => {
    let currentUrl = window.location.pathname;
    let currentId = currentUrl.split('/');
    hasCreate = currentId[2];
    console.log('initial inputGroup = ', hasCreate);
    if (hasCreate.toLocaleLowerCase() === 'create') {
      isUpdate = false;
      hasCreate = 'create';
    } else {
      const {
        detailActionCreators,
        detailXProductProductCategoryActionCreators,
      } = this.props;
      const { fetchProductDetail } = detailActionCreators;
      const {
        filterXProductProductCategory,
      } = detailXProductProductCategoryActionCreators;
      fetchProductDetail(`/${GET}/${currentId[2]}`);
      let requestData = [
        {
          key: 'productId',
          value: currentId[2],
        },
      ];
      parseJSON(requestData);

      filterXProductProductCategory(requestData);
    }
  };

  handleSubmitForm = data => {
    data.preventDefault();
    const {
      productDetail,
      detailActionCreators,
      detailXProductProductCategoryActionCreators,
    } = this.props;

    let target = data.target;
    const { addProduct, updateProduct } = detailActionCreators;
    const {
      filterXProductProductCategory,
      updateXProductProductCategory,
      addXProductProductCategory,
    } = detailXProductProductCategoryActionCreators;
    let requestX =
      this.props.xProductProductCategoryDetail != null
        ? this.props.xProductProductCategoryDetail[0]
        : null;

    let requestData = parseJSON(target);

    if (productDetail && productDetail.id) {
      requestData['id'] = productDetail.id;
      requestData['isActive'] =
        requestData.isActive.toLocaleLowerCase() === 'true';
      requestData['homeFlag'] =
        requestData.homeFlag.toLocaleLowerCase() === 'true';
      requestData['hotFlag'] =
        requestData.hotFlag.toLocaleLowerCase() === 'true';
      requestData['image'] = parseImages('singleFile');
      requestData['moreImages'] = parseImages('multipleFiles');

      // product Category Id
      requestX['productCategoryId'] = parseInt(requestData.productCategory);
      updateProduct(requestData);
      updateXProductProductCategory(requestX);
    } else {
      requestData['id'] = 0;
      requestData['isActive'] =
        requestData.isActive.toLocaleLowerCase() === 'true';
      requestData['homeFlag'] =
        requestData.homeFlag.toLocaleLowerCase() === 'true';
      requestData['hotFlag'] =
        requestData.hotFlag.toLocaleLowerCase() === 'true';
      requestData['image'] = parseImages('singleFile');
      requestData['moreImages'] = parseImages('multipleFiles');
      requestData['viewCount'] = 0;
      requestData['description'] =
        requestData['description'] !== undefined
          ? requestData['description']
          : '';
      requestData['content'] =
        requestData['content'] !== undefined ? requestData['content'] : '';
      // delete requestData.productCategory;

      addProduct(requestData);
      this.AddXCategory = true;
      this.CategoryId = parseInt(requestData.productCategory);
      // const resp = await insert.json();
      // product Category Id
      // requestX['productCategoryId'] = parseInt(requestData.productCategory);

      // updateProduct(requestData);
      // updateXProductProductCategory(requestX);
    }
    if (this.productDetail !== undefined && this.productDetail !== null) {
      let resp = this.productDetail;
      console.log('resp = ', resp);
    }
  };

  ChangeAlias = productClass => {
    const productValue = $('.' + productClass).val();
    changeAlias(null, 'product-alias', convertToSlug(productValue));
  };

  renderBoard = (productDetail, listProductCategory) => {
    let xhtml = null;

    // PUT ADD CATEGORY FUNCTION HERE
    if (this.AddXCategory) {
      const { detailXProductProductCategoryActionCreators } = this.props;
      const {
        addXProductProductCategory,
      } = detailXProductProductCategoryActionCreators;

      let requestX = [];
      requestX['productCategoryId'] = this.CategoryId;
      requestX['productId'] = parseInt(productDetail);
      requestX['id'] = 0;
      addXProductProductCategory(requestX);
      this.AddXCategory = false;
    }

    const { classes } = this.props;
    // var defaultCategory =
    //   xProductProductCategoryDetail != null
    //     ? xProductProductCategoryDetail[0].productCategoryId
    //     : 0;
    // this.state = {
    //   productCategory: { defaultCategory },
    // };
    const {
      loading,
      uploading,
      images,
      loadingSingle,
      uploadingSingle,
      image,
    } = this.state;

    const content = type => {
      if (type === 'single') {
        switch (true) {
          // case loading:
          //   return <Buttons onChange={this.onChange}  />
          case uploadingSingle:
            return <Spinner />;
          case image.length > 0:
            return (
              <Images
                images={image}
                removeImage={this.removeImage}
                onError={this.onError}
                nameFile="singleFile"
              />
            );
          default:
            return <Buttons onChange={this.onChange} type={type} />;
        }
      } else {
        switch (true) {
          // case loading:
          //   return <Buttons onChange={this.onChange}  />
          case uploading:
            return <Spinner />;
          case images.length > 0:
            return (
              <Images
                images={images}
                removeImage={this.removeImage}
                onError={this.onError}
                nameFile="multipleFiles"
              />
            );
          default:
            return <Buttons onChange={this.onChange} type={type} />;
        }
      }
    };

    const isUpdate = !!(
      productDetail !== undefined &&
      productDetail !== null &&
      productDetail.length !== 0
    );

    if (isUpdate) console.log('product title =' + isUpdate);

    xhtml = (
      <Page
        title={hasCreate === 'create' ? 'Create Product' : 'Update Product'}
        breadcrumbs={[
          {
            name: hasCreate === 'create' ? 'Create Product' : 'Update Product',
            active: true,
          },
        ]}
      >
        <Row>
          <Col xl={12} lg={12} md={12}>
            <Card className="mb-3">
              <CardHeader>
                {hasCreate === 'create' ? 'Create Product' : 'Update Product'}
              </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Col sm={12}>
                    <Input
                      type="hidden"
                      name="id"
                      defaultValue={isUpdate ? productDetail.id : 0}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleName" sm={2}>
                    Product Name :
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="name"
                      onChange={() => this.ChangeAlias('product-name')}
                      placeholder="please enter your product name !!!"
                      defaultValue={isUpdate ? productDetail.name : ''}
                      className="product-name"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleAlias" sm={2}>
                    Alias :
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="alias"
                      placeholder="it will be automatically render follow product name !!!"
                      readOnly
                      defaultValue={isUpdate ? productDetail.alias : ''}
                      id="product-alias"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleSelect" sm={2}>
                    Category
                  </Label>
                  <Col sm={10}>
                    <Input type="select" name="productCategory">
                      {listProductCategory.map((resp, idx) => {
                        return (
                          <option key={idx} value={resp.id}>
                            {resp.name}
                          </option>
                        );
                      })}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleAlias" sm={2}>
                    Image :
                  </Label>
                  <Col sm={10}>
                    <div className="buttons">{content('single')}</div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleAlias" sm={2}>
                    More Images :
                  </Label>
                  <Col sm={10}>
                    <div className="buttons">{content()}</div>
                    {/* {isUpdate ? (
                        <div className="buttons">
                          <Images
                            images={productDetail.moreImages.split(';')}
                            removeImage={this.removeImage}
                            onError={this.onError}
                            nameFile="multipleFiles"
                          />
                        </div>
                      ) : (
                        <div className="buttons">{content()}</div>
                      )} */}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleSelectMulti" sm={2}>
                    Nội dung
                  </Label>
                  <Col sm={10}>
                    <SunEditor
                      name="content"
                      setContents={isUpdate ? productDetail.content : ''}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleSelectMulti" sm={2}>
                    Mô tả
                  </Label>
                  <Col sm={10}>
                    <SunEditor
                      setContents={isUpdate ? productDetail.description : ''}
                      name="description"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleSelect" sm={2}>
                    Home Flag
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="select"
                      name="homeFlag"
                      defaultValue={isUpdate ? productDetail.homeFlag : ''}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleSelect" sm={2}>
                    Hot Flag
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="select"
                      name="hotFlag"
                      defaultValue={isUpdate ? productDetail.hotFlag : ''}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleActive" sm={2}>
                    Active
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="select"
                      name="isActive"
                      defaultValue={isUpdate ? productDetail.isActive : ''}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </Input>
                  </Col>
                </FormGroup>
                <Button
                  type="submit"
                  color="primary"
                  className={classes.button}
                  active
                >
                  Save
                </Button>
                <Button
                  color="secondary"
                  onClick={() => this.goToProducts()}
                  active
                >
                  Cancel
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );

    return xhtml;
  };

  render() {
    const {
      productDetail,
      handleSubmit,
      listProductCategory,
      xProductProductCategoryDetail,
    } = this.props;
    if (
      productDetail != null &&
      this.state.image !== undefined &&
      this.state.images !== undefined
    ) {
      if (this.state.image.length === 0 && this.state.images.length === 0)
        this.updateState(productDetail.image, productDetail.moreImages);
    }
    // let defaultCategory =
    //   xProductProductCategoryDetail != null
    //     ? xProductProductCategoryDetail[0].productCategoryId
    //     : 0;
    // if(defaultCategory !== 0)
    // this.setState({
    //   productCategory: { defaultCategory },
    // });

    return (
      <form onSubmit={this.handleSubmitForm}>
        {this.renderBoard(productDetail, listProductCategory)}
      </form>
    );
  }
}

InputGroupPage.propTypes = {
  detailActionCreators: PropTypes.shape({
    fetchListProduct: PropTypes.func,
    fetchProductDetail: PropTypes.func,
    addProduct: PropTypes.func,
    updateProduct: PropTypes.func,
    deleteProduct: PropTypes.func,
    setProductUpdating: PropTypes.func,
  }),
  detailCategoryActionCreators: PropTypes.shape({
    fetchListProductCategory: PropTypes.func,
  }),
  detailXProductProductCategoryActionCreators: PropTypes.shape({
    filterXProductProductCategory: PropTypes.func,
    updateXProductProductCategory: PropTypes.func,
    addXProductProductCategory: PropTypes.func,
  }),
  modalActionCreators: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeModalTitle: PropTypes.func,
    changeModalContent: PropTypes.func,
  }),
  listProductCategory: PropTypes.array,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    productDetail: state.product.productDetail,
    listProductCategory: state.productCategory.listProductCategory,
    xProductProductCategoryDetail:
      state.xProductProductCategory.xProductProductCategoryDetail,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    detailActionCreators: bindActionCreators(detailActions, dispatch),
    detailCategoryActionCreators: bindActionCreators(
      detailCategoryActions,
      dispatch,
    ),
    detailXProductProductCategoryActionCreators: bindActionCreators(
      detailXProductProductCategoryActions,
      dispatch,
    ),
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(InputGroupPage),
);
