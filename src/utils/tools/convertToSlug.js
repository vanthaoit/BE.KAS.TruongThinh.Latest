/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
export const convertToSlug = data => {
  let str = data;
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  let from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
  let to = 'aaaaaeeeeeiiiiooooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};
