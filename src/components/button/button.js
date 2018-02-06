import React, {PropTypes} from 'react';
import cx from 'classnames';

import './button.css';

function Button({
  color,
  children,
}) {
  return (
    <button
      role="button"
      className={cx({
        'button': true,
        [`button-color-${color}`]: true
      })}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'tertiary',
  ]).isRequired,
  children: PropTypes.node,
};

Button.defaultProps = {
  color: 'primary',
};

export default Button;
