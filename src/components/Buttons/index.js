/* eslint-disable import/no-unresolved */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faImage } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'utils/tools/propTypes';

const Buttons = ({ onChange, type }) => {
  let typeFile = null;

  typeFile =
    type === 'single' ? (
      <div className="buttons fadein">
        <div className="button">
          <label htmlFor="single">
            <FontAwesomeIcon icon={faImages} color="#6d84b4" size="10x" />
          </label>
          <input type="file" id="single" onChange={onChange} />
        </div>
      </div>
    ) : (
      <div className="buttons fadein">
        <div className="button">
          <label htmlFor="multi">
            <FontAwesomeIcon icon={faImages} color="#6d84b4" size="10x" />
          </label>
          <input type="file" id="multi" onChange={onChange} multiple />
        </div>
      </div>
    );

  return <>{typeFile}</>;
};

Buttons.propTypes = {
  onChange: PropTypes.component,
  type: PropTypes.string,
};
export default Buttons;
