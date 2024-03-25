import clsx from "clsx";
import { AspectRatio } from "./primitives/AspectRatio";

export type AvatarProps = Omit<
  React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
    initials?: string;
  },
  "width" | "height" | "ref"
>;

export const Avatar: React.FC<AvatarProps> = ({ initials, className, children, ...props }) => (
  <span
    className={clsx(
      className,
      "inline-grid rounded-full align-middle *:col-start-1 *:row-start-1 *:rounded-full",
      !props.src && !children && "dark:bg-white dark:text-black bg-zinc-900 text-white",
    )}
    data-slot="avatar"
  >
    {props.src || children ? (
      <AspectRatio ratio={1 / 1}>
        {children}
      </AspectRatio>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="select-none rounded-full fill-current text-[48px] font-medium uppercase"
        aria-hidden
      >
        <text x="50%" y="50%" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" dy=".125em">
          {initials?.slice(0, 2)}
        </text>
      </svg>
    )}
    <span className="dark:ring-white/5 z-50 ring-1 ring-inset ring-black/5 forced-colors:outline" aria-hidden></span>
  </span>
);
