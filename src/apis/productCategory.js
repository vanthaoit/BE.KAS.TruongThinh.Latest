/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-absolute-path */
/* eslint-disable import/order */
import qs from 'query-string';
import httpServiceBase from '../utils/commons/services/HTTPServiceBase';
import { API_ENDPOINT } from 'utils/constants/systems/auth';

// http://localhost:3000/productCategories
const url = 'productCategory';

export const getList = (params = {}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = params; 
  }
  return httpServiceBase.get(`${API_ENDPOINT}/${url}${queryParams}`);
};
export const getDetail = (params = {}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = params; 
  }
  const resp = httpServiceBase.get(`${API_ENDPOINT}/${url}${queryParams}`);
  return resp;
};
// http://localhost:3000/productCategories METHOD: POST
export const addProductCategory = data => {
  return httpServiceBase.post(`${API_ENDPOINT}/${url}`, data);
};

// http://localhost:3000/productCategories/:id METHOD: PUT
export const updateProductCategory = (data, productCategoryId) => {
  return httpServiceBase.put(`${API_ENDPOINT}/${url}/${productCategoryId}`, data);
};

// http://localhost:3000/productCategories/:id METHOD: DELETE
export const deleteProductCategory = productCategoryId => {
  return httpServiceBase.delete(`${API_ENDPOINT}/${url}/${productCategoryId}`);
};
