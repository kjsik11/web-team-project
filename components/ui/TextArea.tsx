import React from 'react';
import cn from 'classnames';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  containerClassName?: string;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  label?: string;
  message?: string;
  error?: boolean;
  color?: 'lightBlue';
}

const colorClasses = {
  lightBlue:
    'border-gray-300 focus:ring-lightBlue-400 focus:border-lightBlue-400',
};

const TextArea: React.FC<Props> = ({
  className,
  containerClassName,
  containerProps,
  label,
  message,
  error = false,
  color = 'lightBlue',
  name,
  value,
  ...props
}) => {
  const ref = React.useRef<HTMLTextAreaElement>(null);

  return (
    <div
      className={cn(containerClassName, 'relative text-left')}
      {...containerProps}
    >
      {label !== undefined && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="mt-1 relative rounded-md shadow-sm">
        <textarea
          ref={ref}
          name={name}
          className={cn(
            className,
            'block w-full border-gray-300 focus:ring-0 focus:outline-none text-base font-normal rounded-md',
            {
              [colorClasses[color]]: !error,
              'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500': error,
            },
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={name && error ? `${name}-error` : undefined}
          value={value}
          {...props}
        />
      </div>
      {message !== undefined && (
        <p
          className={cn('mt-1 text-sm', {
            'text-red-600': error,
          })}
          id={name && error ? `${name}-error` : undefined}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default TextArea;
