import { Modal, ModalOverlay, Dialog as RADialog, type DialogProps as RADialogProps } from "react-aria-components";
import { cn } from "@ui/primitives/utils.ts";

export const sizes = {
  xs: "sm:max-w-xs",
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  "5xl": "sm:max-w-5xl",
};

export type DialogProps = RADialogProps & {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  size?: keyof typeof sizes;
};

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, size = "lg", children, className, ...props }) => (
  <ModalOverlay
    className={({ isEntering, isExiting }) => `dark:bg-zinc-950/50 fixed inset-0 grid w-screen grid-rows-[1fr_auto] justify-items-center overflow-y-auto bg-zinc-950/25 focus:outline-0 sm:grid-rows-[1fr_auto_3fr] 
      ${isEntering ? 'animate-in fade-in duration-300 ease-out' : ''}
      ${isExiting ? 'animate-out fade-out duration-200 ease-in' : ''}
    `}
    isOpen={open}
    onOpenChange={onOpenChange}
    isDismissable
  >
    <Modal className={({ isEntering, isExiting }) => `row-start-2
      ${isEntering ? 'animate-in zoom-in-95 ease-out duration-300' : ''}
      ${isExiting ? 'animate-out zoom-out-95 ease-in duration-200' : ''}
    `}>
      <RADialog
        className={cn(
          "dark:bg-zinc-900 dark:ring-white/10 w-full min-w-0 rounded-t-3xl bg-white p-[--gutter] shadow-lg outline-none ring-1 ring-zinc-950/10 [--gutter:theme(spacing.8)] sm:mb-auto sm:max-w-lg sm:rounded-2xl",
          sizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </RADialog>
    </Modal>
  </ModalOverlay>
);

export type DialogFooterProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const DialogFooter: React.FC<DialogFooterProps> = ({ children, className, ...props }) => (
  <div
    className={cn(
      "mt-8 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto",
      className,
    )}
    data-slot="control"
    {...props}
  >
    {children}
  </div>
);

