/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-absolute-path */
/* eslint-disable import/order */
import qs from 'query-string';
import httpServiceBase from '../utils/commons/services/HTTPServiceBase';
import { API_ENDPOINT } from 'utils/constants/systems/auth';

// http://localhost:3000/productCategories
const url = 'XProduct_XProduct_ProductCategory';
const filter = 'GetByFilter';
const update = 'Update';
const insert = 'Insert'

export const getList = (params = {}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = params; 
  }
  return httpServiceBase.get(`${API_ENDPOINT}/${url}${queryParams}`);
};
export const getDetail = (data) => {
    
    const resp = httpServiceBase.post(`${API_ENDPOINT}/${url}/${filter}`,data);
    return resp;
  };
// http://localhost:3000/productCategories METHOD: POST
export const addXProductProductCategory = data => {
  return httpServiceBase.post(`${API_ENDPOINT}/${url}/${insert}`, data);
};

// http://localhost:3000/productCategories/:id METHOD: PUT
export const updateXProductProductCategory = (data) => {
  const resp = httpServiceBase.post(`${API_ENDPOINT}/${url}/${update}`, data);
  return resp;
};

// http://localhost:3000/productCategories/:id METHOD: DELETE
export const deleteXProductProductCategory = XProductProductCategoryId => {
  return httpServiceBase.delete(`${API_ENDPOINT}/${url}/${XProductProductCategoryId}`);
};
