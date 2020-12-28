/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
export const parseJSON = data => {
  let requestData = {};
  for (let item = 0; item < data.length; item++) {
    if (
      data[item].name !== '' &&
      data[item].name !== 'id' &&
      data[item].value !== ''
    ) {
      requestData[data[item].name] = data[item].value;
    }
  }
  return requestData;
};
