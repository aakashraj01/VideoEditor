import React from 'react';

interface ButtonProps {
  label?: React.ReactNode;  
  onClick: () => void;      
  style?: React.CSSProperties; 
  className?: string;       
  type?: "button" | "submit" | "reset"; 
  disabled?: boolean;   
}

// The Button component
const Button: React.FC<ButtonProps> = ({ label, onClick, style, className, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      className={`btn ${className || ''}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {label || 'Default Button'}
    </button>
  );
};

export default Button;
