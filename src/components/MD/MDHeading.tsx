import clsx from "clsx";
import { type HeadingProps, Heading as RAHeading } from "react-aria-components";

export const MDHeading2: React.FC<HeadingProps> = ({ className, children, ...props }) => (
  <RAHeading
    level={2}
    className={clsx(
      className,
      "not-prose mb-2 whitespace-pre-wrap font-bold text-2xl text-zinc-900 leading-loose dark:text-white",
    )}
    data-slot="title"
    {...props}
  >
    {children}
  </RAHeading>
);

export const MDHeading3: React.FC<HeadingProps> = ({ className, children, ...props }) => (
  <RAHeading
    level={3}
    className={clsx(className, "mb-2 font-semibold text-xl text-zinc-900 leading-loose dark:text-white")}
    data-slot="title"
    {...props}
  >
    {children}
  </RAHeading>
);

export const MDHeading4: React.FC<HeadingProps> = ({ className, children, ...props }) => (
  <RAHeading
    level={4}
    className={clsx(className, "mb-2 font-medium text-zinc-900 leading-loose dark:text-white")}
    data-slot="title"
    {...props}
  >
    {children}
  </RAHeading>
);
