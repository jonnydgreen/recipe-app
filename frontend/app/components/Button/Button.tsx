import { Link } from '@remix-run/react';
import type { ButtonHTMLAttributes } from 'react';

const buttonSpecificClasses = {
  confirm:
    'bg-transparent border-green-700 enabled:hover:bg-green-800 focus:ring-indigo-500',
  danger:
    'bg-transparent border-red-700 enabled:hover:bg-red-800 focus:ring-indigo-500',
  primary: 'text-white bg-indigo-600 enabled:hover:bg-indigo-700',
  secondary: 'bg-indigo-100 text-indigo-700 enabled:hover:bg-indigo-200',
};
const padding = {
  large: 'py-4 px-6',
  small: 'py-2 px-4',
  default: 'py-2 px-4',
};
const fontSizes = {
  large: '',
  small: 'text-xs',
  default: 'text-sm ',
};

export function Button({
  className,
  children,
  to,
  variant = 'primary',
  size,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  size?: 'large' | 'small';
  to?: string;
  variant?: keyof typeof buttonSpecificClasses;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const sizeToUse = size ?? 'default';

  const sharedClassNames = `rounded-md border-2 font-medium  shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2 ${padding[sizeToUse]} ${fontSizes[sizeToUse]}`;

  const classNameToUse = `${sharedClassNames} ${
    buttonSpecificClasses[variant]
  } ${className ?? ''}`;

  return (
    <>
      {to ? (
        <Link className={classNameToUse} to={to}>
          {children}
        </Link>
      ) : (
        <button
          className={`${sharedClassNames} ${buttonSpecificClasses[variant]} ${
            className ?? ''
          }`}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
}
