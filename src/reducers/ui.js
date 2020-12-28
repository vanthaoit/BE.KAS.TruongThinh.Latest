/* eslint-disable import/no-unresolved */
import * as types from 'utils/constants/ui';

const initialState = {
  showLoading: false,
  showSidebar: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_LOADING: {
      return {
        ...state,
        showLoading: true,
      };
    }
    case types.HIDE_LOADING: {
      return {
        ...state,
        showLoading: false,
      };
    }
    case types.SHOW_SIDEBAR: {
      return {
        ...state,
        showSidebar: true,
      };
    }
    case types.HIDE_SIDEBAR: {
      return {
        ...state,
        showSidebar: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
