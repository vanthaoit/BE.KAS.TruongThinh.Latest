/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import { STATUSES } from 'utils/constants/status';
import { WHIS,GET_ALL,GET } from 'utils/constants/systems/APImethods';
import * as productCategoryConstants from 'utils/constants/contentManagement/productCategory';

export const fetchListProductCategory = (params = WHIS + GET_ALL) => {
  return {
    type: productCategoryConstants.FETCH_PRODUCT_CATEGORY,
    payload: {
      params,
    },
  };
};

export const fetchListProductCategorySuccess = data => {
  return {
    type: productCategoryConstants.FETCH_PRODUCT_CATEGORY_SUCCESS,
    payload: {
      data,
    },
  };
};

export const fetchListProductCategoryFailed = error => {
  return {
    type: productCategoryConstants.FETCH_PRODUCT_CATEGORY_FAILED,
    payload: {
      error,
    },
  };
};

export const filterProductCategory = keyword => ({
  type: productCategoryConstants.FILTER_PRODUCT_CATEGORY,
  payload: {
    keyword,
  },
});

export const filterProductCategorySuccess = data => ({
  type: productCategoryConstants.FILTER_PRODUCT_CATEGORY_SUCCESS,
  payload: {
    data,
  },
});

export const addProductCategory = (title, description) => {
  return {
    type: productCategoryConstants.ADD_PRODUCT_CATEGORY,
    payload: {
      title,
      description,
    },
  };
};

export const addProductCategorySuccess = data => {
  return {
    type: productCategoryConstants.ADD_PRODUCT_CATEGORY_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addProductCategoryFailed = error => {
  return {
    type: productCategoryConstants.ADD_PRODUCT_CATEGORY_FAILED,
    payload: {
      error,
    },
  };
};

export const setProductCategoryUpdating = PRODUCT => {
  return {
    type: productCategoryConstants.SET_PRODUCT_CATEGORY_UPDATING,
    payload: {
      PRODUCT,
    },
  };
};

export const updateProductCategory = (title, description, status = STATUSES[0].value) => {
  return {
    type: productCategoryConstants.UPDATE_PRODUCT_CATEGORY,
    payload: {
      title,
      description,
      status,
    },
  };
};

export const updateProductCategorySuccess = data => {
  return {
    type: productCategoryConstants.UPDATE_PRODUCT_CATEGORY_SUCCESS,
    payload: {
      data,
    },
  };
};

export const updateProductCategoryFailed = error => {
  return {
    type: productCategoryConstants.UPDATE_PRODUCT_CATEGORY_FAILED,
    payload: {
      error,
    },
  };
};

export const deleteProductCategory = id => {
  return {
    type: productCategoryConstants.DELETE_PRODUCT_CATEGORY,
    payload: {
      id,
    },
  };
};

export const deleteProductCategorySuccess = data => {
  return {
    type: productCategoryConstants.DELETE_PRODUCT_CATEGORY_SUCCESS,
    payload: {
      data,
    },
  };
};

export const deleteProductCategoryFailed = error => {
  return {
    type: productCategoryConstants.DELETE_PRODUCT_CATEGORY_FAILED,
    payload: {
      error,
    },
  };
};
