/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'utils/tools/propTypes';

const Images = ({ images, removeImage, onError, nameFile }) => {
  return (
    <>
      {images.map((image, i) => (
        <div key={i} className="fadein images">
          <div onClick={() => removeImage(image)} className="delete">
            <FontAwesomeIcon icon={faTimesCircle} size="2x" />
          </div>
          <img
            className={nameFile}
            src={image}
            alt=""
            onError={() => onError(image)}
          />
        </div>
      ))}
    </>
  );
};

Images.propTypes = {
  removeImage: PropTypes.component,
  onError: PropTypes.component,
  images: PropTypes.arrayOf(PropTypes.string),
};
export default Images;
