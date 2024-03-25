import clsx from "clsx";
import { FieldError, type FieldErrorProps } from "react-aria-components";

export const ErrorMessage: React.FC<FieldErrorProps> = ({ children, className, ...props }) => (
  <FieldError
    className={clsx("dark:text-red-500 text-base/6 text-red-600 data-[disabled]:opacity-50 sm:text-sm/6", className)}
    {...props}
  >
    {children}
  </FieldError>
);
