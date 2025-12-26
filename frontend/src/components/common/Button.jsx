import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'font-semibold rounded-lg transition duration-200 cursor-pointer';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-indigo-700 disabled:bg-gray-400',
    secondary: 'bg-secondary text-white hover:bg-rose-500 disabled:bg-gray-400',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
