import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon,
  children, 
  ...props 
}) => {
  const baseStyles = "flex items-center justify-center rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-pastel-blue text-blue-800 shadow-[0_4px_0_#93C5FD] hover:bg-blue-200 active:shadow-none active:translate-y-1",
    secondary: "bg-white text-gray-600 border-2 border-gray-200 shadow-[0_4px_0_#E5E7EB] hover:bg-gray-50 active:shadow-none active:translate-y-1",
    success: "bg-pastel-mint text-green-800 shadow-[0_4px_0_#86EFAC] hover:bg-green-200 active:shadow-none active:translate-y-1",
    danger: "bg-red-100 text-red-800 shadow-[0_4px_0_#FCA5A5] hover:bg-red-200 active:shadow-none active:translate-y-1",
    ghost: "bg-transparent text-gray-500 hover:bg-gray-100 shadow-none"
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-xl w-full"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
