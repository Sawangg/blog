"use client";

import { cn } from "@ui/primitives/utils.ts";
import { type InputProps, Input as RAInput } from "react-aria-components";

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <span
      className="relative block w-full after:pointer-events-none after:absolute before:absolute after:inset-0 before:inset-px dark:before:hidden after:rounded-lg before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:has-[[data-disabled]]:bg-zinc-950/5 has-[[data-disabled]]:opacity-50 before:shadow before:has-[[data-disabled]]:shadow-none before:has-[[data-invalid]]:shadow-red-500/10 after:ring-transparent sm:after:focus-within:ring-2 sm:after:focus-within:ring-sky-500 after:ring-inset"
      data-slot="control"
    >
      <RAInput
        className={cn(
          "relative block w-full appearance-none rounded-lg border border-zinc-950/10 bg-transparent px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] text-base/6 text-zinc-950 after:pointer-events-none dark:border-white/10 dark:data-[hovered]:border-white/20 dark:data-[hovered]:data-[disabled]:border-white/15 data-[disabled]:border-zinc-950/20 data-[disabled]:dark:border-white/15 data-[hovered]:border-zinc-950/20 data-[invalid]:border-red-500 data-[invalid]:dark:border-red-500 data-[invalid]:data-[hovered]:border-red-500 data-[invalid]:data-[hovered]:dark:border-red-500 dark:bg-white/5 data-[disabled]:dark:bg-white/[2.5%] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] dark:text-white placeholder:text-zinc-500 sm:text-sm/6 focus:outline-none",
          className,
        )}
        {...props}
      />
    </span>
  );
};
