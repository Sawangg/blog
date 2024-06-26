"use client";

import {
  Menu,
  MenuItem,
  type MenuItemProps,
  type MenuProps,
  MenuTrigger,
  type MenuTriggerProps,
  Popover,
  Separator,
  type SeparatorProps,
} from "react-aria-components";
import { cn } from "./primitives/utils";

export const Dropdown: React.FC<MenuTriggerProps> = ({ children, ...props }) => (
  <MenuTrigger {...props}>{children}</MenuTrigger>
);

export const DropdownMenu: React.FC<MenuProps<object>> = ({ children, ...props }) => (
  <Popover>
    <Menu
      className="isolate w-max overflow-y-auto rounded-xl bg-white/75 p-1 shadow-lg outline outline-1 outline-transparent ring-1 ring-zinc-950/10 backdrop-blur-xl supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto] dark:bg-zinc-800/75 focus:outline-none dark:ring-white/10 dark:ring-inset"
      {...props}
    >
      {children}
    </Menu>
  </Popover>
);

export const DropdownItem: React.FC<MenuItemProps> = ({ className, children, ...props }) => (
  <MenuItem
    className={cn(
      className,
      "group [&>[data-slot=icon]]:-ml-0.5 [&>[data-slot=avatar]]:-ml-1 col-span-full grid cursor-pointer grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center rounded-lg px-3.5 py-2.5 text-left text-base/6 text-zinc-950 forced-color-adjust-none [&>[data-slot=icon]]:col-start-1 [&>[data-slot=icon]]:row-start-1 [&>[data-slot=avatar]]:mr-2.5 [&>[data-slot=icon]]:mr-2.5 sm:[&>[data-slot=avatar]]:mr-2 sm:[&>[data-slot=icon]]:mr-2 [&>[data-slot=avatar]]:size-6 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:sm:size-4 sm:[&>[data-slot=avatar]]:size-5 data-[focused]:bg-sky-500 forced-colors:data-[focused]:bg-[Highlight] sm:px-3 sm:py-1.5 [&>[data-slot=icon]]:dark:text-zinc-400 [&>[data-slot=icon]]:data-[focused]:dark:text-white [&>[data-slot=icon]]:data-[focused]:text-white [&>[data-slot=icon]]:text-zinc-500 dark:text-white data-[focused]:text-white forced-colors:[&>[data-slot=icon]]:data-[focused]:text-[HighlightText] forced-colors:data-[focused]:text-[HighlightText] forced-colors:text-[CanvasText] sm:text-sm/6 data-[disabled]:opacity-50 focus:outline-none",
    )}
    {...props}
  >
    {children}
  </MenuItem>
);

export const DropdownDivider: React.FC<SeparatorProps> = ({ ...props }) => (
  <Separator
    className="col-span-full mx-3.5 my-1 h-px border-zinc-950/10 border-t sm:mx-3 dark:border-white/[0.2] "
    {...props}
  />
);
