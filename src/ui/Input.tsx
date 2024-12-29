"use client";

import { cn } from "@lib/utils";
import { type InputProps, Input as RAInput } from "react-aria-components";

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <span
      className="relative block w-full before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset has-data-disabled:opacity-50 has-data-disabled:before:bg-zinc-950/5 has-data-disabled:before:shadow-none has-data-invalid:before:shadow-red-500/10 sm:focus-within:after:ring-2 sm:focus-within:after:ring-sky-500 dark:before:hidden"
      data-slot="control"
    >
      <RAInput
        className={cn(
          "relative block w-full appearance-none rounded-lg border border-zinc-950/10 bg-transparent px-[calc(calc(var(--spacing)*3.5)-1px)] py-[calc(calc(var(--spacing)*2.5)-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 after:pointer-events-none focus:outline-hidden data-invalid:data-hovered:border-red-500 data-disabled:border-zinc-950/20 data-hovered:border-zinc-950/20 data-invalid:border-red-500 sm:px-[calc(calc(var(--spacing)*3)-1px)] sm:py-[calc(calc(var(--spacing)*1.5)-1px)] sm:text-sm/6 dark:border-white/10 dark:data-hovered:data-disabled:border-white/15 dark:data-invalid:data-hovered:border-red-500 dark:bg-white/5 dark:text-white dark:data-disabled:border-white/15 dark:data-hovered:border-white/20 dark:data-invalid:border-red-500 dark:data-disabled:bg-white/[2.5%]",
          className,
        )}
        {...props}
      />
    </span>
  );
};
