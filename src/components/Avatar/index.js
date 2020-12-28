/* eslint-disable import/no-unresolved */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'utils/tools/propTypes';

import userImage from 'assets/images/users/100_4.jpg';

const Avatar = ({
  rounded,
  circle,
  src,
  size,
  tag: Tag,
  className,
  style,
  ...restProps
}) => {
  const classes = classNames({ 'rounded-circle': circle, rounded }, className);
  return (
    <Tag
      src={src}
      style={{ width: size, height: size, ...style }}
      className={classes}
      {...restProps}
    />
  );
};

Avatar.propTypes = {
  tag: PropTypes.component,
  rounded: PropTypes.bool,
  circle: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string,
  style: PropTypes.object,
};

Avatar.defaultProps = {
  tag: 'img',
  rounded: false,
  circle: true,
  size: 40,
  src: userImage,
  style: {},
};

export default Avatar;
