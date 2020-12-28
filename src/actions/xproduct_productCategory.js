/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import { STATUSES } from 'utils/constants/status';
import { WHIS,GET_ALL,GET } from 'utils/constants/systems/APImethods';
import * as xproductProductCategoryConstants from 'utils/constants/contentManagement/xProductProductCategory';

export const fetchListXProductProductCategory = (params = WHIS + GET_ALL) => {
  return {
    type: xproductProductCategoryConstants.FETCH_XPRODUCT_PRODUCT_CATEGORY,
    payload: {
      params,
    },
  };
};

export const fetchListXProductProductCategorySuccess = data => {
  return {
    type: xproductProductCategoryConstants.FETCH_XPRODUCT_PRODUCT_CATEGORY_SUCCESS,
    payload: {
      data,
    },
  };
};

export const fetchListXProductProductCategoryFailed = error => {
  return {
    type: xproductProductCategoryConstants.FETCH_XPRODUCT_PRODUCT_CATEGORY_FAILED,
    payload: {
      error,
    },
  };
};

export const filterXProductProductCategory = (data) => ({
  type: xproductProductCategoryConstants.FILTER_XPRODUCT_PRODUCT_CATEGORY,
  payload: {
    data
  },
});

export const filterXProductProductCategorySuccess = data => ({
  type: xproductProductCategoryConstants.FILTER_XPRODUCT_PRODUCT_CATEGORY_SUCCESS,
  payload: {
    data,
  },
});
export const filterXProductProductCategoryFailed = error => ({
    type: xproductProductCategoryConstants.FILTER_XPRODUCT_PRODUCT_CATEGORY_FAILED,
    payload: {
        error,
    },
  });

export const addXProductProductCategory = (content, description) => {
  return {
    type: xproductProductCategoryConstants.ADD_XPRODUCT_PRODUCT_CATEGORY,
    payload: {
      content,
      description,
    },
  };
};

export const addXProductProductCategorySuccess = data => {
  return {
    type: xproductProductCategoryConstants.ADD_XPRODUCT_PRODUCT_CATEGORY_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addXProductProductCategoryFailed = error => {
  return {
    type: xproductProductCategoryConstants.ADD_XPRODUCT_PRODUCT_CATEGORY_FAILED,
    payload: {
      error,
    },
  };
};

export const setXProductProductCategoryUpdating = PRODUCT => {
  return {
    type: xproductProductCategoryConstants.SET_XPRODUCT_PRODUCT_CATEGORY_UPDATING,
    payload: {
      PRODUCT,
    },
  };
};

export const updateXProductProductCategory = data => {
  return {
    type: xproductProductCategoryConstants.UPDATE_XPRODUCT_PRODUCT_CATEGORY,
    payload: data,
  };
};

export const updateXProductProductCategorySuccess = data => {
  return {
    type: xproductProductCategoryConstants.UPDATE_XPRODUCT_PRODUCT_CATEGORY_SUCCESS,
    payload: {
      data,
    },
  };
};

export const updateXProductProductCategoryFailed = error => {
  return {
    type: xproductProductCategoryConstants.UPDATE_XPRODUCT_PRODUCT_CATEGORY_FAILED,
    payload: {
      error,
    },
  };
};

export const deleteXProductProductCategory = id => {
  return {
    type: xproductProductCategoryConstants.DELETE_XPRODUCT_PRODUCT_CATEGORY,
    payload: {
      id,
    },
  };
};

export const deleteXProductProductCategorySuccess = data => {
  return {
    type: xproductProductCategoryConstants.DELETE_XPRODUCT_PRODUCT_CATEGORY_SUCCESS,
    payload: {
      data,
    },
  };
};

export const deleteXProductProductCategoryFailed = error => {
  return {
    type: xproductProductCategoryConstants.DELETE_XPRODUCT_PRODUCT_CATEGORY_FAILED,
    payload: {
      error,
    },
  };
};
