/* eslint-disable func-names */
/* eslint-disable no-debugger */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable spaced-comment */
/* eslint-disable no-useless-concat */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-absolute-path */
/* eslint-disable import/order */
import qs from 'query-string';
import httpServiceBase from '../utils/commons/services/HTTPServiceBase';
import { API_ENDPOINT } from 'utils/constants/systems/auth';
import { putResolve } from 'redux-saga/effects';

// http://localhost:3000/products
const url = 'product';
const update = 'update';
const insert = 'insert';

export const getList = (params = {}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = params; //`?${qs.stringify(params)}`;
  }
  const resp = httpServiceBase.get(`${API_ENDPOINT}/${url}${queryParams}`);
  return resp;
};

export const getDetail = (params = {}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = params; //`?${qs.stringify(params)}`;
  }
  const resp = httpServiceBase.get(`${API_ENDPOINT}/${url}${queryParams}`);
  return resp;
};

// http://localhost:3000/products METHOD: POST
export const addProduct = data => {
  const resp = httpServiceBase.post(`${API_ENDPOINT}/${url}/${insert}`, data);
  return resp;
};

// http://localhost:3000/Products/:id METHOD: PUT
export const updateProduct = (data, productId) => {
  // const bigData = {
  //   content: 'cont',
  //   homeFlat: 'true',
  //   hotFlat: 'true',
  //   name: 'nnnn77',
  //   status: 'true',
  //   id: 5,
  // };
  const resp = httpServiceBase.post(`${API_ENDPOINT}/${url}/${update}`, data);

  return resp;
};

// http://localhost:3000/products/:id METHOD: DELETE
export const deleteProduct = productId => {
  return httpServiceBase.delete(`${API_ENDPOINT}/${url}/${productId}`);
};
