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
        text-md focus:ring-none inline-flex 
        w-full
        items-center
        justify-center 
        border
        border-dark-bg 
        bg-white dark:bg-dark-primary rounded-2xl 
        px-4 
        py-3 
        text-sm 
        font-bold
        shadow-neubrutalism-sm transition
        duration-300
        ease-in-out  hover:-translate-x-0.5  hover:-translate-y-0.5  hover:bg-gray-50 hover:shadow-neubrutalism-md  
        ${props.className || ''}
      `}
    >
      {children}
    </button>
  );
}
