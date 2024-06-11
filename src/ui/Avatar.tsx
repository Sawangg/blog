import { cn } from "./primitives/utils";
import { AspectRatio } from "./primitives/AspectRatio";

export type AvatarProps = Omit<
  React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
    initials?: string;
    square?: boolean;
  },
  "width" | "height" | "ref"
>;

export const Avatar: React.FC<AvatarProps> = ({ initials, square, className, ...props }) => (
  <span
    className={cn(
      className,
      "[--avatar-radius:20%] [--ring-opacity:20%]",
      "inline-grid shrink-0 align-middle *:col-start-1 *:row-start-1 outline outline-1 -outline-offset-1 outline-black/[--ring-opacity] dark:outline-white/[--ring-opacity]",
      !square ? "rounded-full *:rounded-full" : "rounded-[--avatar-radius] *:rounded-[--avatar-radius]",
      !props.src && "bg-zinc-900 text-white dark:bg-white dark:text-black",
    )}
    data-slot={props.slot ?? "avatar"}
  >
    {props.src ? (
      <AspectRatio ratio={1 / 1}>
        {/* You can replace the img tag with your framework's Image implementation */}
        <img
          src={props.src}
          alt={props.alt ?? ""}
          className={cn("relative size-full -z-10", !square ? "rounded-full *:rounded-full" : "rounded-[--avatar-radius] *:rounded-[--avatar-radius]")}
          {...props}
        />
      </AspectRatio>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="select-none fill-current text-[48px] font-medium uppercase"
        aria-hidden
      >
        <text x="50%" y="50%" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" dy=".125em">
          {initials ? initials.slice(0, 2) : "??"}
        </text>
      </svg>
    )}
  </span>
);
