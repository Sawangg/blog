"use client";

import { cn } from "./primitives/utils";
import {
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  Separator,
  type MenuItemProps,
  type MenuProps,
  type MenuTriggerProps,
  type SeparatorProps
} from "react-aria-components";

export const Dropdown: React.FC<MenuTriggerProps> = ({ children, ...props }) => (
  <MenuTrigger {...props}>
    {children}
  </MenuTrigger>
);

export const DropdownMenu: React.FC<MenuProps<object>> = ({ children, ...props }) => (
  <Popover>
    <Menu className="isolate w-max rounded-xl p-1 outline outline-1 outline-transparent focus:outline-none overflow-y-auto bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75 shadow-lg ring-1 ring-zinc-950/10 dark:ring-inset dark:ring-white/10 supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]" {...props}>
      {children}
    </Menu>
  </Popover>
);

export const DropdownItem: React.FC<MenuItemProps> = ({ className, children, ...props }) => (
  <MenuItem
    className={cn(
      className,
      "group cursor-pointer rounded-lg px-3.5 py-2.5 focus:outline-none sm:px-3 sm:py-1.5 text-left text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText] data-[focused]:bg-blue-500 data-[focused]:text-white data-[disabled]:opacity-50 forced-color-adjust-none forced-colors:data-[focused]:bg-[Highlight] forced-colors:data-[focused]:text-[HighlightText] forced-colors:[&>[data-slot=icon]]:data-[focused]:text-[HighlightText] col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center [&>[data-slot=icon]]:col-start-1 [&>[data-slot=icon]]:row-start-1 [&>[data-slot=icon]]:-ml-0.5 [&>[data-slot=icon]]:mr-2.5 [&>[data-slot=icon]]:size-5 sm:[&>[data-slot=icon]]:mr-2 [&>[data-slot=icon]]:sm:size-4 [&>[data-slot=icon]]:text-zinc-500 [&>[data-slot=icon]]:data-[focused]:text-white [&>[data-slot=icon]]:dark:text-zinc-400 [&>[data-slot=icon]]:data-[focused]:dark:text-white [&>[data-slot=avatar]]:-ml-1 [&>[data-slot=avatar]]:mr-2.5 [&>[data-slot=avatar]]:size-6 sm:[&>[data-slot=avatar]]:mr-2 sm:[&>[data-slot=avatar]]:size-5"
    )}
    {...props}
  >
    {children}
  </MenuItem>
);

export const DropdownDivider: React.FC<SeparatorProps> = ({ ...props }) => (
  <Separator className="col-span-full mx-3.5 my-1 h-px border-t border-zinc-950/10 sm:mx-3 dark:border-white/[0.2] " {...props} />
);

