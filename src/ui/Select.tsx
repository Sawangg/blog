"use client";

import { cn } from "@ui/primitives/utils.ts";
import {
  Button,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  Popover,
  Select as RASelect,
  type SelectProps as RASelectProps,
  SelectValue,
} from "react-aria-components";
import { ChevronUpDownIcon } from "./icons/ChevronUpDownIcon";

export type SelectProps = RASelectProps<object> & {
  label: string;
};

export const Select: React.FC<SelectProps> = ({ label, className, children, ...props }) => (
  <RASelect
    className="group relative block w-full after:pointer-events-none after:absolute before:absolute after:inset-0 before:inset-px dark:before:hidden after:rounded-lg before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:has-[[data-disabled]]:bg-zinc-950/5 has-[[data-disabled]]:opacity-50 before:shadow before:has-[[data-disabled]]:shadow-none after:ring-transparent sm:after:has-[[data-focused]]:ring-2 sm:after:has-[[data-focused]]:ring-sky-500 after:ring-inset"
    aria-label={label}
    data-slot="control"
    {...props}
  >
    <Button
      className={cn(
        "relative block w-full cursor-pointer appearance-none rounded-lg border border-zinc-950/10 bg-transparent py-[calc(theme(spacing[2.5])-1px)] pr-[calc(theme(spacing.10)-1px)] pl-[calc(theme(spacing[3.5])-1px)] text-base/6 text-zinc-950 dark:border-white/10 dark:data-[hovered]:border-white/20 dark:data-[hovered]:data-[disabled]:border-white/15 data-[disabled]:border-zinc-950/20 data-[disabled]:dark:border-white/15 data-[hovered]:border-zinc-950/20 data-[invalid]:border-red-500 data-[invalid]:dark:border-red-600 data-[invalid]:data-[hovered]:border-red-500 data-[invalid]:data-[hovered]:dark:border-red-600 dark:bg-white/5 data-[disabled]:dark:bg-white/[2.5%] sm:py-[calc(theme(spacing[1.5])-1px)] sm:pr-[calc(theme(spacing.9)-1px)] sm:pl-[calc(theme(spacing.3)-1px)] [&_optgroup]:font-semibold dark:*:text-white dark:text-white placeholder:text-zinc-500 sm:text-sm/6 data-[disabled]:opacity-100 focus:outline-none",
        className,
      )}
    >
      <SelectValue />
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" aria-hidden>
        <ChevronUpDownIcon className="size-5 stroke-zinc-500 sm:size-4 dark:stroke-zinc-400 forced-colors:stroke-[CanvasText] group-has-[[data-disabled]]:stroke-zinc-600" />
      </span>
    </Button>
    <Popover className="min-w-[var(--trigger-width)] rounded-lg border border-zinc-950/10 bg-white p-1 text-sm/7 dark:border-white/10 dark:bg-zinc-800">
      <ListBox className="border-none focus:outline-none">{children}</ListBox>
    </Popover>
  </RASelect>
);

export type OptionProps = Omit<
  React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>,
  "value" | "ref"
> &
  Omit<ListBoxItemProps<object>, "value"> & {
    value: string;
  };

export const Option: React.FC<OptionProps> = ({ children, value, ...props }) => (
  <ListBoxItem
    id={value}
    className="cursor-pointer rounded-md pl-1 data-[hovered]:bg-sky-500 dark:text-white data-[hovered]:text-white focus:outline-none"
    {...props}
  >
    {children}
  </ListBoxItem>
);
