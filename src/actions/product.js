/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import { WHIS,GET_ALL,GET } from 'utils/constants/systems/APImethods';
import * as productConstants from 'utils/constants/contentManagement/product';
import { GetApp } from '@material-ui/icons';

export const fetchListProduct = (params = WHIS + GET_ALL) => {
  return {
    type: productConstants.FETCH_PRODUCT,
    payload: {
      params,
    },
  };
};

export const fetchListProductSuccess = data => {
  return {
    type: productConstants.FETCH_PRODUCT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const fetchListProductFailed = error => {
  return {
    type: productConstants.FETCH_PRODUCT_FAILED,
    payload: {
      error,
    },
  };
};

export const fetchProductDetail = (params) => {
  return {
    type: productConstants.FETCH_PRODUCT_DETAIL,
    payload: {
      params,
    },
  };
};

export const fetchProductDetailSuccess = data => {
  return {
    type: productConstants.FETCH_PRODUCT_DETAIL_SUCCESS,
    payload: {
      data,
    },
  };
};

export const fetchProductDetailFailed = error => {
  return {
    type: productConstants.FETCH_PRODUCT_DETAIL_FAILED,
    payload: {
      error,
    },
  };
};

export const filterProduct = keyword => ({
  type: productConstants.FILTER_PRODUCT,
  payload: {
    keyword,
  },
});

export const filterProductSuccess = data => ({
  type: productConstants.FILTER_PRODUCT_SUCCESS,
  payload: {
    data,
  },
});

export const addProduct = data => {
  return {
    type: productConstants.ADD_PRODUCT,
    payload: data
  };
};

export const addProductSuccess = data => {
  return {
    type: productConstants.ADD_PRODUCT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addProductFailed = error => {
  return {
    type: productConstants.ADD_PRODUCT_FAILED,
    payload: {
      error,
    },
  };
};

export const setProductUpdating = product => {
  return {
    type: productConstants.SET_PRODUCT_UPDATING,
    payload: {
      product,
    },
  };
};

export const updateProduct = data => {
  return {
    type: productConstants.UPDATE_PRODUCT,
    payload:data,
  };
};

export const updateProductSuccess = data => {
  return {
    type: productConstants.UPDATE_PRODUCT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const updateProductFailed = error => {
  return {
    type: productConstants.UPDATE_PRODUCT_FAILED,
    payload: {
      error,
    },
  };
};

export const deleteProduct = id => {
  return {
    type: productConstants.DELETE_PRODUCT,
    payload: {
      id,
    },
  };
};

export const deleteProductSuccess = data => {
  return {
    type: productConstants.DELETE_PRODUCT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const deleteProductFailed = error => {
  return {
    type: productConstants.DELETE_PRODUCT_FAILED,
    payload: {
      error,
    },
  };
};
