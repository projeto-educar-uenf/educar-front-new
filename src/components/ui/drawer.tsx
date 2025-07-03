import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const drawerVariants = cva(
  "fixed inset-y-0 z-[100] flex h-[100dvh] flex-col bg-background shadow-lg transition-all duration-300 ease-in-out",
  {
    variants: {
      side: {
        left: "left-0 border-r",
        right: "right-0 border-l",
      },
      size: {
        sm: "w-3/4 sm:max-w-sm",
        default: "w-3/4 sm:max-w-md",
        lg: "w-3/4 sm:max-w-lg",
        xl: "w-3/4 sm:max-w-xl",
        full: "w-full",
      },
    },
    defaultVariants: {
      side: "left",
      size: "default",
    },
  },
);

const Overlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { open: boolean }
>(({ className, open, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm transition-all duration-300 cursor-pointer",
      open ? "opacity-100" : "pointer-events-none opacity-0",
      className,
    )}
    {...props}
  />
));
Overlay.displayName = "DrawerOverlay";

export interface DrawerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof drawerVariants> {
  open: boolean;
  onClose: () => void;
}

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ className, children, open, onClose, side, size, ...props }, ref) => {
    // Handle ESC key
    React.useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // Prevent body scroll when drawer is open
    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [open]);

    return (
      <>
        <Overlay open={open} onClick={onClose} />
        <div
          ref={ref}
          className={cn(
            drawerVariants({ side, size }),
            open
              ? "translate-x-0"
              : side === "left"
                ? "-translate-x-full"
                : "translate-x-full",
            className,
          )}
          {...props}
        >
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Filtros</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-muted"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4">{children}</div>
        </div>
      </>
    );
  },
);
Drawer.displayName = "Drawer";

export { Drawer, Overlay };
