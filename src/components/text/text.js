import React, {PropTypes} from 'react';
import cx from 'classnames';

import './text.css';

function Text({
  color,
  size,
  children,
}) {
  return (
    <span
      className={cx({
        'text': true,
        [`text-color-${color}`]: true,
        [`text-size-${size}`]: true,
      })}
    >
      {children}
    </span>
  );
}

Text.propTypes = {
  color: PropTypes.oneOf([
    'white',
    'dark-grey',
  ]).isRequired,
  size: PropTypes.oneOf([
    'meta',
    'standard',
    'large',
    'huge',
  ]).isRequired,
  children: PropTypes.node,
};

Text.defaultProps = {
  color: 'dark-grey',
  size: 'standard',
};

export default Text;
