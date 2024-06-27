import { cn } from "@ui/primitives/utils.ts";
import { FieldError, type FieldErrorProps } from "react-aria-components";

export const ErrorMessage: React.FC<FieldErrorProps> = ({ children, className, ...props }) => (
  <FieldError
    className={cn("text-base/6 text-red-600 dark:text-red-500 sm:text-sm/6 data-[disabled]:opacity-50", className)}
    {...props}
  >
    {children}
  </FieldError>
);
