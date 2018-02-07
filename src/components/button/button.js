import React, { PropTypes } from 'react';
import cx from 'classnames';

import './button.css';

function Button({ color, children, onClick }) {
  return (
    <button
      role="button"
      className={cx({
        button: true,
        [`button-color-${color}`]: true,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  color: PropTypes.oneOf(['primary', 'tertiary']).isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  color: 'primary',
  onClick: () => {},
};

export default Button;
