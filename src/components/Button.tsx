import React, { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  type = 'button', // Set the default button type
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={`
        focus:ring-none 
        inline-flex 
        items-center
        justify-center 
        text-white
        bg-blue-500 
        hover:bg-blue-600
        dark:bg-dark-primary 
        rounded-lg 
        px-8 
        py-2.5 
        text-lg 
        font-circular-bold
        scale-100
        hover:scale-105
        transition
        duration-300
        ease-in-out  
        ${props.className || ''}
      `}
    >
      {children}
    </button>
  );
}
