/* eslint-disable import/no-unresolved */
import * as productConstants from 'utils/constants/contentManagement/product';
import * as productNotification from 'utils/constants/notificationManagement/product';
import { toastError, toastSuccess } from '../helpers/toastHelper';

const initialState = {
  listProduct: [],
  productDetail: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // S LIST
    case productConstants.FETCH_PRODUCT: {
      return {
        ...state,
        listProduct: [],
        productDetail: null,
      };
    }
    case productConstants.FETCH_PRODUCT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listProduct: data,
        productDetail: data,
      };
    }
    case productConstants.FETCH_PRODUCT_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
        listProduct: [],
      };
    }
    // END LIST
    // S DETAIL
    case productConstants.FETCH_PRODUCT_DETAIL: {
      return {
        ...state,
        productDetail: null,
      };
    }
    case productConstants.FETCH_PRODUCT_DETAIL_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        productDetail: data,
      };
    }
    case productConstants.FETCH_PRODUCT_DETAIL_FAILED: {
      const { data } = action.payload;
      return {
        ...state,
        productDetail: data,
      };
    }
    // END DETAIL
    case productConstants.FILTER_PRODUCT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listProduct: data,
      };
    }
    case productConstants.ADD_PRODUCT: {
      return {
        ...state,
      };
    }
    case productConstants.ADD_PRODUCT_SUCCESS: {
      const { data } = action.payload;
      toastSuccess(productNotification.ADD_PRODUCT_SUCCESS);
      return {
        ...state,
        listProduct: [data].concat(state.listProduct),
        productDetail: data,
      };
    }
    case productConstants.ADD_PRODUCT_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    case productConstants.SET_PRODUCT_UPDATING: {
      const { product } = action.payload;
      return {
        ...state,
        productDetail: product,
      };
    }
    case productConstants.UPDATE_PRODUCT: {
      return {
        ...state,
      };
    }
    case productConstants.UPDATE_PRODUCT_SUCCESS: {
      const { data } = action.payload;
      const { listProduct } = state;
      const index = listProduct.findIndex(item => item.id === data.id);
      if (index !== -1) {
        const newList = [
          ...listProduct.slice(0, index),
          data,
          ...listProduct.slice(index + 1),
        ];
        toastSuccess(productNotification.UPDATE_PRODUCT_SUCCESS);
        return {
          ...state,
          listProduct: newList,
        };
      }
      return {
        ...state,
      };
    }
    case productConstants.UPDATE_PRODUCT_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    case productConstants.DELETE_PRODUCT: {
      return {
        ...state,
      };
    }
    case productConstants.DELETE_PRODUCT_SUCCESS: {
      const { data: productId } = action.payload; // product id
      toastSuccess(productNotification.DELETE_PRODUCT_FAILED);
      return {
        ...state,
        listProduct: state.listProduct.filter(item => item.id !== productId),
      };
    }
    case productConstants.DELETE_PRODUCT_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default reducer;
