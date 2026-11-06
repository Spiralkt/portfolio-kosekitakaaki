"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const LOCAL_SIDEBAR_COOKIE_NAME = "local_sidebar_state";
const LOCAL_SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const LOCAL_SIDEBAR_WIDTH = "16rem";
const LOCAL_SIDEBAR_WIDTH_MOBILE = "18rem";
const LOCAL_SIDEBAR_WIDTH_ICON = "3rem";
const LOCAL_SIDEBAR_KEYBOARD_SHORTCUT = "l";

type LocalSidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleLocalSidebar: () => void;
};

const LocalSidebarContext =
  React.createContext<LocalSidebarContextProps | null>(null);

function useLocalSidebar() {
  const context = React.useContext(LocalSidebarContext);
  if (!context) {
    throw new Error(
      "useLocalSidebar must be used within a LocalSidebarProvider.",
    );
  }

  return context;
}

function LocalSidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the local sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the local sidebar state.
      document.cookie = `${LOCAL_SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${LOCAL_SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the local sidebar.
  const toggleLocalSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the local sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === LOCAL_SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleLocalSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleLocalSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the local sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<LocalSidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleLocalSidebar,
    }),
    [
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleLocalSidebar,
    ],
  );

  return (
    <LocalSidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="local-sidebar-wrapper"
          style={
            {
              "--local-sidebar-width": LOCAL_SIDEBAR_WIDTH,
              "--local-sidebar-width-icon": LOCAL_SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/local-sidebar-wrapper has-data-[variant=inset]:bg-local-sidebar relative flex h-full w-full",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </LocalSidebarContext.Provider>
  );
}

function LocalSidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useLocalSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="local-sidebar"
        className={cn(
          "bg-local-sidebar text-local-sidebar-foreground flex h-full w-[var(--local-sidebar-width)] flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-local-sidebar="local-sidebar"
          data-slot="local-sidebar"
          data-mobile="true"
          className="bg-local-sidebar text-local-sidebar-foreground w-[var(--local-sidebar-width)] p-0 [&>button]:hidden"
          style={
            {
              "--local-sidebar-width": LOCAL_SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>LocalSidebar</SheetTitle>
            <SheetDescription>
              Displays the mobile local sidebar.
            </SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer text-local-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="local-sidebar"
    >
      {/* This is what handles the local sidebar gap on desktop */}
      <div
        data-slot="local-sidebar-gap"
        className={cn(
          "relative w-[var(--local-sidebar-width)] bg-transparent transition-[width] duration-100 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--local-sidebar-width-icon)+1rem)]"
            : "group-data-[collapsible=icon]:w-[var(--local-sidebar-width-icon)]",
        )}
      />
      <div
        data-slot="local-sidebar-container"
        className={cn(
          "absolute inset-y-0 z-10 hidden h-full w-[var(--local-sidebar-width)] transition-[left,right,width] duration-100 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--local-sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--local-sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--local-sidebar-width-icon)+1rem+2px)]"
            : "group-data-[collapsible=icon]:w-[var(--local-sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-local-sidebar="local-sidebar"
          data-slot="local-sidebar-inner"
          className="bg-local-sidebar group-data-[variant=floating]:border-local-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function LocalSidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleLocalSidebar } = useLocalSidebar();

  return (
    <Button
      data-local-sidebar="trigger"
      data-slot="local-sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleLocalSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle LocalSidebar</span>
    </Button>
  );
}

function LocalSidebarRail({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { toggleLocalSidebar } = useLocalSidebar();

  return (
    <button
      data-local-sidebar="rail"
      data-slot="local-sidebar-rail"
      aria-label="Toggle LocalSidebar"
      tabIndex={-1}
      onClick={toggleLocalSidebar}
      title="Toggle LocalSidebar"
      className={cn(
        "hover:after:bg-local-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-local-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
}

function LocalSidebarInset({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="local-sidebar-inset"
      className={cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className,
      )}
      {...props}
    />
  );
}

function LocalSidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="local-sidebar-input"
      data-local-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  );
}

function LocalSidebarHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="local-sidebar-header"
      data-local-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function LocalSidebarFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="local-sidebar-footer"
      data-local-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function LocalSidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="local-sidebar-separator"
      data-local-sidebar="separator"
      className={cn("bg-local-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  );
}

function LocalSidebarContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="local-sidebar-content"
      data-local-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function LocalSidebarGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="local-sidebar-group"
      data-local-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
}

function LocalSidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="local-sidebar-group-label"
      data-local-sidebar="group-label"
      className={cn(
        "text-local-sidebar-foreground/70 ring-local-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-100 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function LocalSidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="local-sidebar-group-action"
      data-local-sidebar="group-action"
      className={cn(
        "text-local-sidebar-foreground ring-local-sidebar-ring hover:bg-local-sidebar-accent hover:text-local-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function LocalSidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="local-sidebar-group-content"
      data-local-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  );
}

function LocalSidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="local-sidebar-menu"
      data-local-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}

function LocalSidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="local-sidebar-menu-item"
      data-local-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}

const localSidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-local-sidebar-ring transition-[width,height,padding] hover:bg-local-sidebar-accent hover:text-local-sidebar-accent-foreground focus-visible:ring-2 active:bg-local-sidebar-accent active:text-local-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[local-sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-local-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-local-sidebar-accent-foreground data-[state=open]:hover:bg-local-sidebar-accent data-[state=open]:hover:text-local-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "hover:bg-local-sidebar-accent hover:text-local-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--local-sidebar-border))] hover:bg-local-sidebar-accent hover:text-local-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--local-sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function LocalSidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof localSidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useLocalSidebar();

  const button = (
    <Comp
      data-slot="local-sidebar-menu-button"
      data-local-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        localSidebarMenuButtonVariants({ variant, size }),
        className,
      )}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}

function LocalSidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  showOnHover?: boolean;
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="local-sidebar-menu-action"
      data-local-sidebar="menu-action"
      className={cn(
        "text-local-sidebar-foreground ring-local-sidebar-ring hover:bg-local-sidebar-accent hover:text-local-sidebar-accent-foreground peer-hover/menu-button:text-local-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "peer-data-[active=true]/menu-button:text-local-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function LocalSidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="local-sidebar-menu-badge"
      data-local-sidebar="menu-badge"
      className={cn(
        "text-local-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-local-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-local-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function LocalSidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean;
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      data-slot="local-sidebar-menu-skeleton"
      data-local-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-local-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-[var(--skeleton-width)] flex-1"
        data-local-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

function LocalSidebarMenuSub({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="local-sidebar-menu-sub"
      data-local-sidebar="menu-sub"
      className={cn(
        "border-local-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function LocalSidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="local-sidebar-menu-sub-item"
      data-local-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  );
}

function LocalSidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
  size?: "sm" | "md";
  isActive?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="local-sidebar-menu-sub-button"
      data-local-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "text-local-sidebar-foreground ring-local-sidebar-ring hover:bg-local-sidebar-accent hover:text-local-sidebar-accent-foreground active:bg-local-sidebar-accent active:text-local-sidebar-accent-foreground [&>svg]:text-local-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-local-sidebar-accent data-[active=true]:text-local-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

export {
  LocalSidebar,
  LocalSidebarContent,
  LocalSidebarFooter,
  LocalSidebarGroup,
  LocalSidebarGroupAction,
  LocalSidebarGroupContent,
  LocalSidebarGroupLabel,
  LocalSidebarHeader,
  LocalSidebarInput,
  LocalSidebarInset,
  LocalSidebarMenu,
  LocalSidebarMenuAction,
  LocalSidebarMenuBadge,
  LocalSidebarMenuButton,
  LocalSidebarMenuItem,
  LocalSidebarMenuSkeleton,
  LocalSidebarMenuSub,
  LocalSidebarMenuSubButton,
  LocalSidebarMenuSubItem,
  LocalSidebarProvider,
  LocalSidebarRail,
  LocalSidebarSeparator,
  LocalSidebarTrigger,
  useLocalSidebar,
};
