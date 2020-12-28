/* eslint-disable import/no-unresolved */
import * as xproductProductCategoryConstants from 'utils/constants/contentManagement/xProductProductCategory';
import * as productNotification from 'utils/constants/notificationManagement/product';
import { toastError, toastSuccess } from '../helpers/toastHelper';

const initialState = {
  listxProductProductCategory: [],
  xProductProductCategoryDetail: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // S LIST
    case xproductProductCategoryConstants.FETCH_XPRODUCT_PRODUCT_CATEGORY: {
      return {
        ...state,
        listxProductProductCategory: [],
        xProductProductCategoryDetail: null,
      };
    }
    case xproductProductCategoryConstants.FETCH_XPRODUCT_PRODUCT_CATEGORY_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listxProductProductCategory: data,
        xProductProductCategoryDetail: data,
      };
    }
    case xproductProductCategoryConstants.FETCH_XPRODUCT_PRODUCT_CATEGORY_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
        listxProductProductCategory: [],
      };
    }
    // END LIST
    // S DETAIL
    case xproductProductCategoryConstants.FETCH_XPRODUCT_PRODUCT_CATEGORY_DETAIL: {
      return {
        ...state,
        xProductProductCategoryDetail: null,
      };
    }
    case xproductProductCategoryConstants.FETCH_XPRODUCT_PRODUCT_CATEGORY_DETAIL_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        xProductProductCategoryDetail: data,
      };
    }
    case xproductProductCategoryConstants.FETCH_XPRODUCT_PRODUCT_CATEGORY_DETAIL_FAILED: {
      const { data } = action.payload;
      return {
        ...state,
        xProductProductCategoryDetail: data,
      };
    }
    // END DETAIL
    case xproductProductCategoryConstants.FILTER_XPRODUCT_PRODUCT_CATEGORY_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listxProductProductCategory: data,
      };
    }
    case xproductProductCategoryConstants.ADD_XPRODUCT_PRODUCT_CATEGORY: {
      return {
        ...state,
      };
    }
    case xproductProductCategoryConstants.ADD_XPRODUCT_PRODUCT_CATEGORY_SUCCESS: {
      const { data } = action.payload;
      toastSuccess(productNotification.ADD_PRODUCT_SUCCESS);
      return {
        ...state,
        listxProductProductCategory: [data].concat(
          state.listxProductProductCategory,
        ),
        xProductProductCategoryDetail: data,
      };
    }
    case xproductProductCategoryConstants.ADD_XPRODUCT_PRODUCT_CATEGORY_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }

    case xproductProductCategoryConstants.UPDATE_XPRODUCT_PRODUCT_CATEGORY: {
      return {
        ...state,
      };
    }
    case xproductProductCategoryConstants.UPDATE_XPRODUCT_PRODUCT_CATEGORY_SUCCESS: {
      const { data } = action.payload;
      const { listxProductProductCategory } = state;
      const index = listxProductProductCategory.findIndex(
        item => item.id === data.id,
      );
      if (index !== -1) {
        const newList = [
          ...listxProductProductCategory.slice(0, index),
          data,
          ...listxProductProductCategory.slice(index + 1),
        ];
        toastSuccess(productNotification.UPDATE_PRODUCT_SUCCESS);
        return {
          ...state,
          listxProductProductCategory: newList,
        };
      }
      return {
        ...state,
      };
    }
    case xproductProductCategoryConstants.UPDATE_XPRODUCT_PRODUCT_CATEGORY_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    case xproductProductCategoryConstants.DELETE_XPRODUCT_PRODUCT_CATEGORY: {
      return {
        ...state,
      };
    }
    case xproductProductCategoryConstants.DELETE_XPRODUCT_PRODUCT_CATEGORY_SUCCESS: {
      const { data: productId } = action.payload; // product id
      toastSuccess(productNotification.DELETE_PRODUCT_FAILED);
      return {
        ...state,
        // listxProductProductCategory: state.listxProductProductCategory.filter(item => item.id !== productId),
      };
    }
    case xproductProductCategoryConstants.DELETE_XPRODUCT_PRODUCT_CATEGORY_FAILED: {
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
