import { cn } from "@lib/utils";
import { type LabelProps, Label as RALabel } from "react-aria-components";

export const Label: React.FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <RALabel
      className={cn(
        "select-none text-base/6 text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white",
        className,
      )}
      data-slot="label"
      {...props}
    >
      {children}
    </RALabel>
  );
};
