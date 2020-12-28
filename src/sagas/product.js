/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import {
  call,
  delay,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { hideModal } from '../actions/modal';
import {
  addProductFailed,
  addProductSuccess,
  deleteProductFailed,
  deleteProductSuccess,
  fetchListProduct,
  fetchListProductFailed,
  fetchListProductSuccess,
  fetchProductDetail,
  fetchProductDetailSuccess,
  fetchProductDetailFailed,
  updateProductFailed,
  updateProductSuccess,
} from '../actions/product';
import { hideLoading, showLoading } from '../actions/ui';
import {
  addProduct,
  deleteProduct,
  getList,
  getDetail,
  updateProduct,
} from './../apis/product';
import { STATUSES, STATUS_CODE } from 'utils/constants/status';
import * as productTypes from 'utils/constants/contentManagement/product';
import { propTypes } from 'components/Todos';
import request from 'axios';

/**
 * B1: Thực thi action fetch Product
 * B2: Gọi api
 * B2.1: Hiển thị thanh tiến trình ( loading )
 * B3: Kiểm tra status code
 * Nếu thành công...
 * Nếu thất bại...
 * B4: Tắt loading
 * B5: Thực thi các công việc tiếp theo
 */
function* watchFetchListProductAction() {
  while (true) {
    const action = yield take(productTypes.FETCH_PRODUCT); // Khi FETCH_PRODUCT được dispatch => code từ đây trở xuống sẽ chạy
    yield put(showLoading());
    const { params } = action.payload;
    try {
      const resp = yield call(getList, params);
      const { status, data } = resp;
      if (status === STATUS_CODE.SUCCESS) {
        yield put(fetchListProductSuccess(data));
      } else {
        yield put(fetchListProductFailed(data));
      }
    } catch (error) {
      yield put(fetchListProductFailed(error));
    }

    yield delay(100);
    yield put(hideLoading());
  }
}
function* watchFetchProductDetailAction() {
  while (true) {
    const action = yield take(productTypes.FETCH_PRODUCT_DETAIL); // Khi FETCH_PRODUCT được dispatch => code từ đây trở xuống sẽ chạy
    yield put(showLoading());
    const { params } = action.payload;
    try {
      const resp = yield call(getDetail, params);
      const { status, data } = resp;
      if (status === STATUS_CODE.SUCCESS) {
        yield put(fetchProductDetailSuccess(data));
      } else {
        yield put(fetchProductDetailFailed(data));
      }
    } catch (error) {
      yield put(fetchProductDetailFailed(error));
    }

    yield delay(100);
    yield put(hideLoading());
  }
}

function* filterProductSaga({ payload }) {
  yield delay(100);
  const { keyword } = payload;
  yield put(
    fetchListProduct({
      q: keyword,
    }),
  );
}

function* addProductSaga({ payload }) {
  const { name, content, status, homeFlat, hotFlat } = payload;
  const input  = payload;
  yield put(showLoading());
  try {
    const resp = yield call(addProduct, input);
    const { data } = resp;
    if (resp.status === STATUS_CODE.SUCCESS) {
      yield put(addProductSuccess(data));
      yield put(hideModal());
    } else {
      yield put(addProductFailed(data));
    }
  } catch (error) {
    yield put(addProductFailed(error));
  }

  yield delay(100);
  yield put(hideLoading());
}

function* updateProductSaga({ payload }) {
  const data = payload;
  const productDetail = yield select(state => state.product.productDetail);
  yield put(showLoading());
  try {
    const resp = yield call(updateProduct, data,productDetail.id);

    const { status: statusCode } = resp;

    if (statusCode === STATUS_CODE.SUCCESS) {
      yield put(updateProductSuccess(resp.data));
    } else {
      yield put(updateProductFailed(resp.data));
    }
  } catch (error) {
    yield put(updateProductFailed(error));
  }

  yield delay(100);
  yield put(hideLoading());
}

function* putUpdateProduct(data) {
  const response = yield updateProduct(data);
  return "abc";
}

function* deleteProductSaga({ payload }) {
  const { id } = payload;
  yield put(showLoading());
  const resp = yield call(deleteProduct, id);
  const { data, status: statusCode } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(deleteProductSuccess(id));
    yield put(hideModal());
  } else {
    yield put(deleteProductFailed(data));
  }
  yield delay(100);
  yield put(hideLoading());
}

function* productSaga() {
  yield fork(watchFetchListProductAction);
  yield fork(watchFetchProductDetailAction);
  yield takeLatest(productTypes.FILTER_PRODUCT, filterProductSaga);
  yield takeEvery(productTypes.ADD_PRODUCT, addProductSaga);
  yield takeEvery(productTypes.UPDATE_PRODUCT, updateProductSaga);
  yield takeLatest(productTypes.DELETE_PRODUCT, deleteProductSaga);
}

export default productSaga;
