import PropTypes from 'prop-types';
import React from 'react';
import './Button.css';

function Button(props) {
  const { children, className, dataTestId } = props;

  return (
    <button type="button" className={ className } data-testid={ dataTestId }>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  className: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
};

export default Button;
