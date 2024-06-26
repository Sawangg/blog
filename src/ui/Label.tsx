import { type LabelProps, Label as RALabel } from "react-aria-components";

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <RALabel
      className="select-none text-base/6 text-zinc-950 dark:text-white sm:text-sm/6 data-[disabled]:opacity-50"
      data-slot="label"
      {...props}
    >
      {children}
    </RALabel>
  );
};
