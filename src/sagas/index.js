import { all } from 'redux-saga/effects';
import taskSaga from './task';
import productSaga from './product';
import productCategorySaga from './productCategory';
import xProductProductCategory from './xproduct_ProductCategory';

function* rootSaga() {
  yield all([
    taskSaga(),
    productSaga(),
    productCategorySaga(),
    xProductProductCategory(),
  ]);
}

export default rootSaga;
