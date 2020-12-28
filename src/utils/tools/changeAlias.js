/* eslint-disable func-names */
/* eslint-disable no-undef */
import $ from 'jquery';

export const changeAlias = (classAlias, idAlias, slug) => {
  if (classAlias !== null) $(`.${classAlias}`).val(slug);

  if (idAlias !== null) $(`#${idAlias}`).val(slug);
};
