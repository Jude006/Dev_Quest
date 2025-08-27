import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  href, 
  onClick, 
  disabled = false,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-heading font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyber-dark inline-flex items-center justify-center';
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-5 py-2.5 text-base',
    large: 'px-6 py-3 text-lg'
  };
  
  const variantClasses = {
    primary: 'bg-cyber-gradient  text-white hover:shadow-lg hover:shadow-neon-blue-500/30 focus:ring-neon-blue-500',
    secondary: 'bg-cyber-gray text-neon-blue-300 border border-cyber-light hover:bg-cyber-light hover:border-neon-blue-400 focus:ring-neon-blue-400',
    success: 'bg-matrix-green text-cyber-dark hover:bg-opacity-90 focus:ring-matrix-green',
    danger: 'bg-error-red text-white hover:bg-opacity-90 focus:ring-error-red',
    ghost: 'bg-transparent text-neon-blue-300 hover:bg-cyber-gray focus:ring-neon-blue-300',
    outline: 'bg-transparent text-neon-blue-300 border border-neon-blue-500 hover:bg-neon-blue-900/20 focus:ring-neon-blue-400'
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled ? disabledClasses : 'hover:scale-105'}
    ${className}
  `.replace(/\s+/g, ' ').trim();
  
  if (href) {
    return (
      <Link
        to={href}
        className={buttonClasses}
        {...props}
      >
        {Icon && iconPosition === 'left' && <Icon className="mr-2" size={18} />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className="ml-2" size={18} />}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="mr-2" size={18} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="ml-2" size={18} />}
    </button>
  );
};

export default Button;