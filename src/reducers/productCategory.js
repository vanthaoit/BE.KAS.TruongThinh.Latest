/* eslint-disable import/no-unresolved */
import * as productCategoryConstants from 'utils/constants/contentManagement/productCategory';
import * as productNotification from 'utils/constants/notificationManagement/product';
import { toastError, toastSuccess } from '../helpers/toastHelper';

const initialState = {
  listProductCategory: [],
  productCategoryDetail: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // S LIST
    case productCategoryConstants.FETCH_PRODUCT_CATEGORY: {
      return {
        ...state,
        listProductCategory: [],
        productCategoryDetail: null,
      };
    }
    case productCategoryConstants.FETCH_PRODUCT_CATEGORY_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listProductCategory: data,
        productCategoryDetail: data,
      };
    }
    case productCategoryConstants.FETCH_PRODUCT_CATEGORY_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
        listProductCategory: [],
      };
    }
    // END LIST
    // S DETAIL
    case productCategoryConstants.FETCH_PRODUCT_CATEGORY_DETAIL: {
      return {
        ...state,
        productCategoryDetail: null,
      };
    }
    case productCategoryConstants.FETCH_PRODUCT_CATEGORY_DETAIL_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        productCategoryDetail: data,
      };
    }
    case productCategoryConstants.FETCH_PRODUCT_CATEGORY_DETAIL_FAILED: {
      const { data } = action.payload;
      return {
        ...state,
        productCategoryDetail: data,
      };
    }
    // END DETAIL
    case productCategoryConstants.FILTER_PRODUCT_CATEGORY_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listProductCategory: data,
      };
    }
    case productCategoryConstants.ADD_PRODUCT_CATEGORY: {
      return {
        ...state,
      };
    }
    case productCategoryConstants.ADD_PRODUCT_CATEGORY_SUCCESS: {
      const { data } = action.payload;
      toastSuccess(productNotification.ADD_PRODUCT_SUCCESS);
      return {
        ...state,
        listProductCategory: [data].concat(state.listProductCategory),
        productCategoryDetail: data,
      };
    }
    case productCategoryConstants.ADD_PRODUCT_CATEGORY_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }

    case productCategoryConstants.UPDATE_PRODUCT_CATEGORY: {
      return {
        ...state,
      };
    }
    case productCategoryConstants.UPDATE_PRODUCT_CATEGORY_SUCCESS: {
      const { data } = action.payload;
      const { listProductCategory } = state;
      const index = listProductCategory.findIndex(item => item.id === data.id);
      if (index !== -1) {
        const newList = [
          ...listProductCategory.slice(0, index),
          data,
          ...listProductCategory.slice(index + 1),
        ];
        toastSuccess(productNotification.UPDATE_PRODUCT_SUCCESS);
        return {
          ...state,
          listProductCategory: newList,
        };
      }
      return {
        ...state,
      };
    }
    case productCategoryConstants.UPDATE_PRODUCT_CATEGORY_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    case productCategoryConstants.DELETE_PRODUCT_CATEGORY: {
      return {
        ...state,
      };
    }
    case productCategoryConstants.DELETE_PRODUCT_CATEGORY_SUCCESS: {
      const { data: productId } = action.payload; // product id
      toastSuccess(productNotification.DELETE_PRODUCT_FAILED);
      return {
        ...state,
        // listProductCategory: state.listProductCategory.filter(item => item.id !== productId),
      };
    }
    case productCategoryConstants.DELETE_PRODUCT_CATEGORY_FAILED: {
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
