"use client";

import { cn } from "@lib/utils";
import { Button as RAButton, type ButtonProps as RAButtonProps } from "react-aria-components";

const colorClasses = {
  dark: "text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)] [--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hovered]:[--btn-icon:theme(colors.zinc.300)] dark:[--btn-bg:theme(colors.zinc.600)] dark:[--btn-hover-overlay:theme(colors.white/5%)]",
  zinc: "text-white",
  white: "text-zinc-950",
  red: "text-white [--btn-bg:theme(colors.red.600)] [--btn-border:theme(colors.red.700/90%)] [--btn-hover-overlay:theme(colors.white/10%)] [--btn-icon:theme(colors.red.300)] data-[active]:[--btn-icon:theme(colors.red.200)] data-[hovered]:[--btn-icon:theme(colors.red.200)]",
  orange: "",
  amber: "",
  yellow: "",
  lime: "",
  green: "",
  emerald: "",
  teal: "",
  cyan: "",
  sky: "",
  blue: "text-white [--btn-bg:theme(colors.blue.600)] [--btn-border:theme(colors.blue.700/90%)] [--btn-hover-overlay:theme(colors.white/10%)] [--btn-icon:theme(colors.blue.400)] data-[active]:[--btn-icon:theme(colors.blue.300)] data-[hovered]:[--btn-icon:theme(colors.blue.300)]",
  indigo: "",
  violet: "",
  purple: "",
  fuchsia: "",
  pink: "",
  rose: "",

  outline:
    "border-zinc-950/10 text-zinc-950 [--btn-icon:theme(colors.zinc.500)] data-[active]:bg-zinc-950/[2.5%] data-[hovered]:bg-zinc-950/[2.5%] data-[active]:[--btn-icon:theme(colors.zinc.700)] data-[hovered]:[--btn-icon:theme(colors.zinc.700)] dark:border-white/15 dark:text-white dark:[--btn-bg:transparent] dark:data-[active]:bg-white/5 dark:data-[hovered]:bg-white/5 dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] dark:data-[hovered]:[--btn-icon:theme(colors.zinc.400)]",
  plain:
    "text-zinc-950 data-[active]:bg-zinc-950/5 data-[active]:bg-zinc-950/5 data-[hovered]:bg-zinc-950/5 dark:text-white dark:data-[active]:bg-white/10 dark:data-[active]:bg-white/10 dark:data-[hovered]:bg-white/10 [--btn-icon:theme(colors.zinc.500)] data-[active]:[--btn-icon:theme(colors.zinc.700)] data-[active]:[--btn-icon:theme(colors.zinc.700)] data-[hovered]:[--btn-icon:theme(colors.zinc.700)] dark:[--btn-icon:theme(colors.zinc.500)] dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] dark:data-[hovered]:[--btn-icon:theme(colors.zinc.400)]",
};

export type ButtonProps = RAButtonProps & {
  color?: keyof typeof colorClasses;
  outline?: boolean;
  plain?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  color = "dark",
  outline = false,
  plain = false,
  className,
  children,
  ...props
}) => {
  return (
    <RAButton
      className={cn(
        // Base
        "relative isolate inline-flex select-none items-center justify-center gap-x-2 rounded-lg border border-transparent px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] font-semibold text-base/6 focus:outline-none data-[disabled]:opacity-50 data-[focused]:outline data-[focused]:outline-2 data-[focused]:outline-sky-500 data-[focused]:outline-offset-2 sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hovered]:[--btn-icon:ButtonText]",
        // Icon
        "[&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4",
        // Shadow & Border
        "dark:border-white/5",
        !outline &&
          !plain &&
          "dark:after:-inset-px before:-z-10 after:-z-10 before:absolute before:inset-0 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:shadow after:absolute after:inset-0 after:rounded-[calc(theme(borderRadius.lg)-1px)] after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)] after:data-[active]:bg-[--btn-hover-overlay] after:data-[hovered]:bg-[--btn-hover-overlay] after:data-[disabled]:shadow-none before:data-[disabled]:shadow-none dark:after:rounded-lg dark:before:hidden",
        // Color
        !outline && !plain && "bg-[--btn-border] before:bg-[--btn-bg] dark:bg-[--btn-bg]",
        colorClasses[outline ? "outline" : plain ? "plain" : color],
        className,
      )}
      {...props}
    >
      {children}
    </RAButton>
  );
};
