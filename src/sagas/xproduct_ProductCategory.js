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
  addXProductProductCategoryFailed,
  addXProductProductCategorySuccess,
  deleteXProductProductCategoryFailed,
  deleteXProductProductCategorySuccess,
  fetchListXProductProductCategory,
  fetchListXProductProductCategoryFailed,
  fetchListXProductProductCategorySuccess,
  filterXProductProductCategory,
  filterXProductProductCategoryFailed,
  filterXProductProductCategorySuccess,
  updateXProductProductCategoryFailed,
  updateXProductProductCategorySuccess,
} from '../actions/xproduct_productCategory';
import { hideLoading, showLoading } from '../actions/ui';
import {
  addXProductProductCategory,
  deleteXProductProductCategory,
  getList,
  getDetail,
  updateXProductProductCategory,
} from './../apis/xproduct_productCategory';
import { STATUSES, STATUS_CODE } from 'utils/constants/status';
import * as productTypes from 'utils/constants/contentManagement/xProductProductCategory';
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
function* watchFetchListProductCategoryAction() {
  while (true) {
    const action = yield take(productTypes.FETCH_XPRODUCT_PRODUCT_CATEGORY); // Khi FETCH_PRODUCT được dispatch => code từ đây trở xuống sẽ chạy
    yield put(showLoading());
    const { params } = action.payload;
    try {
      const resp = yield call(getList, params);
      const { status, data } = resp;
      if (status === STATUS_CODE.SUCCESS) {
        yield put(fetchListXProductProductCategorySuccess(data));
      } else {
        yield put(fetchListXProductProductCategoryFailed(data));
      }
    } catch (error) {
      yield put(fetchListXProductProductCategoryFailed(error));
    }

    yield delay(100);
    yield put(hideLoading());
  }
}

//   function* watchFetchProductCategoryDetailAction() {
//     while (true) {
//       const action = yield take(productTypes.FETCH_PRODUCT_DETAIL); // Khi FETCH_PRODUCT được dispatch => code từ đây trở xuống sẽ chạy
//       yield put(showLoading());
//       const { params } = action.payload;
//       try {
//         const resp = yield call(getDetail, params);
//         const { status, data } = resp;
//         if (status === STATUS_CODE.SUCCESS) {
//           yield put(fetchProductDetailSuccess(data));
//         } else {
//           yield put(fetchProductDetailFailed(data));
//         }
//       } catch (error) {
//         yield put(fetchProductDetailFailed(error));
//       }

//       yield delay(100);
//       yield put(hideLoading());
//     }
//   }

function* filterXProductProductCategorySaga() {
  while (true) {
    const action = yield take(productTypes.FILTER_XPRODUCT_PRODUCT_CATEGORY); // Khi FETCH_PRODUCT được dispatch => code từ đây trở xuống sẽ chạy
    yield put(showLoading());
    const params = action.payload.data;
    try {
      const resp = yield call(getDetail, params);
      const { status, data } = resp;
      if (status === STATUS_CODE.SUCCESS) {
        yield put(fetchListXProductProductCategorySuccess(data));
      } else {
        yield put(fetchListXProductProductCategoryFailed(data));
      }
    } catch (error) {
      yield put(fetchListXProductProductCategoryFailed(error));
    }

    yield delay(100);
    yield put(hideLoading());
  }
}

function* addXProductProductCategorySaga({ payload }) {
  const { name, content, status, homeFlat, hotFlat } = payload;
  const input = Object.assign({},payload.content) ;
  yield put(showLoading());
  try {
    const resp = yield call(addXProductProductCategory, input);
    const { data } = resp;
    if (resp.status === STATUS_CODE.SUCCESS) {
      yield put(addXProductProductCategorySuccess(data));
      yield put(hideModal());
    } else {
      yield put(addXProductProductCategoryFailed(data));
    }
  } catch (error) {
    yield put(addXProductProductCategoryFailed(error));
  }

  yield delay(100);
  yield put(hideLoading());
}

function* updateXProductProductCategorySaga({ payload }) {
  const data = payload;
  //const productDetail = yield select(state => state.product.productDetail);
  yield put(showLoading());
  try {
    const resp = yield call(updateXProductProductCategory, data);

    const { status: statusCode } = resp;

    if (statusCode === STATUS_CODE.SUCCESS) {
      yield put(updateXProductProductCategorySuccess(resp.data));
    } else {
      yield put(updateXProductProductCategoryFailed(resp.data));
    }
  } catch (error) {
    yield put(updateXProductProductCategoryFailed(error));
  }

  yield delay(100);
  yield put(hideLoading());
}

function* putUpdateProduct(data) {
  const response = yield updateProduct(data);
  return 'abc';
}

function* deleteXProductProductCategorySaga({ payload }) {
  const { id } = payload;
  yield put(showLoading());
  const resp = yield call(deleteProduct, id);
  const { data, status: statusCode } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(deleteXProductProductCategorySuccess(id));
    yield put(hideModal());
  } else {
    yield put(deleteXProductProductCategoryFailed(data));
  }
  yield delay(100);
  yield put(hideLoading());
}

function* productSaga() {
  yield fork(watchFetchListProductCategoryAction);

  //   yield takeLatest(
  //     productTypes.FILTER_XPRODUCT_PRODUCT_CATEGORY,
  //     filterXProductProductCategorySaga,
  //   );
  yield fork(filterXProductProductCategorySaga);
  yield takeEvery(
    productTypes.ADD_XPRODUCT_PRODUCT_CATEGORY,
    addXProductProductCategorySaga,
  );
  yield takeEvery(
    productTypes.UPDATE_XPRODUCT_PRODUCT_CATEGORY,
    updateXProductProductCategorySaga,
  );
  yield takeLatest(
    productTypes.DELETE_XPRODUCT_PRODUCT_CATEGORY,
    deleteXProductProductCategorySaga,
  );
}

export default productSaga;
