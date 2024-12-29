import { cn } from "@lib/utils";
import { FieldError, type FieldErrorProps } from "react-aria-components";

export const ErrorMessage: React.FC<FieldErrorProps> = ({ children, className, ...props }) => (
  <FieldError
    className={cn("text-base/6 text-red-600 data-disabled:opacity-50 sm:text-sm/6 dark:text-red-500", className)}
    {...props}
  >
    {children}
  </FieldError>
);
