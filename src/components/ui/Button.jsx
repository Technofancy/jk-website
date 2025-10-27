import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, type = 'button', variant = 'primary', size = 'md', disabled = false, className = '' }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300';

  const variantStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
    secondary: 'bg-secondary-500 text-black hover:bg-secondary-600 focus:ring-secondary-500',
    ghost: 'hover:text-text-default focus:ring-primary-500',
    link: 'text-primary-500 underline-offset-4 hover:underline focus:ring-primary-500',
    // Later updated, not used yet
    inverted: 'bg-white text-primary-500 hover:bg-gray-100 focus:ring-gray-100',
    'inverted-secondary': 'border-2 border-white text-white hover:bg-white hover:text-primary-500',
  };

  const sizeStyles = {
    sm: 'h-9 px-3',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10',
  };

  const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed';

  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabledStyles,
    className,
  ].join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'link', 'inverted', 'inverted-secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'icon']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;