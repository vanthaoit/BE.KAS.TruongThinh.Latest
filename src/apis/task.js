/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-absolute-path */
/* eslint-disable import/order */
import qs from 'query-string';
import httpServiceBase from '../utils/commons/services/HTTPServiceBase';
import { API_ENDPOINT } from 'utils/constants/systems/auth';

// http://localhost:3000/tasks
const url = 'tasks';

export const getList = (params = {}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  return httpServiceBase.get(`${API_ENDPOINT}/${url}${queryParams}`);
};

// http://localhost:3000/tasks METHOD: POST
export const addTask = data => {
  return httpServiceBase.post(`${API_ENDPOINT}/${url}`, data);
};

// http://localhost:3000/tasks/:id METHOD: PUT
export const updateTask = (data, taskId) => {
  return httpServiceBase.put(`${API_ENDPOINT}/${url}/${taskId}`, data);
};

// http://localhost:3000/tasks/:id METHOD: DELETE
export const deleteTask = taskId => {
  return httpServiceBase.delete(`${API_ENDPOINT}/${url}/${taskId}`);
};
