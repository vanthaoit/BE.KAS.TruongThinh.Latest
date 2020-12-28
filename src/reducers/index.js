import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import taskReducer from './task';
import uiReducer from './ui';
import modalReducer from './modal';
import productReducer from './product';
import productCategoryReducer from './productCategory';
import xProductProductCategoryReducer from './xproduct_ProductCategory';

const rootReducer = combineReducers({
  task: taskReducer,
  ui: uiReducer,
  modal: modalReducer,
  product: productReducer,
  productCategory: productCategoryReducer,
  xProductProductCategory: xProductProductCategoryReducer,
  form: formReducer,
});

export default rootReducer;
