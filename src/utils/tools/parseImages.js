/* eslint-disable func-names */
/* eslint-disable no-undef */
import $ from 'jquery';

export const parseImages = fileName => {
  let resp = '';
  $(`.${fileName}`).each(function(index) {
    if (resp !== '')
      resp = `${resp};${document.getElementsByClassName(fileName)[index].src}`;
    else resp += document.getElementsByClassName(fileName)[index].src;
  });

  return resp;
};
