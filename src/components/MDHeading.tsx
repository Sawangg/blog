import clsx from "clsx";
import { Heading as RAHeading, type HeadingProps } from "react-aria-components";

export const MDHeading2: React.FC<HeadingProps> = ({ className, children, ...props }) => (
  <RAHeading
    level={2}
    className={clsx(
      className,
      "dark:text-white mb-2 font-bold text-zinc-900 text-2xl leading-loose whitespace-pre-wrap not-prose",
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
    className={clsx(
      className,
      "dark:text-white mb-2 font-semibold text-zinc-900 text-xl leading-loose",
    )}
    data-slot="title"
    {...props}
  >
    {children}
  </RAHeading>
);

export const MDHeading4: React.FC<HeadingProps> = ({ className, children, ...props }) => (
  <RAHeading
    level={4}
    className={clsx(
      className,
      "dark:text-white mb-2 font-medium text-zinc-900 leading-loose",
    )}
    data-slot="title"
    {...props}
  >
    {children}
  </RAHeading>
);
