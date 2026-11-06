"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type LocalSidebarContextProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LocalSidebarContext = React.createContext<LocalSidebarContextProps | null>(null);

export function useLocalSidebar() {
  const context = React.useContext(LocalSidebarContext);
  if (!context) {
    throw new Error("useLocalSidebar must be used within a LocalSidebarProvider.");
  }
  return context;
}

export function LocalSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <LocalSidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </LocalSidebarContext.Provider>
  );
}

export function LocalSidebar({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = useLocalSidebar();

  return (
    <aside
      className={cn(
        "h-full overflow-y-auto border-r bg-background transition-all duration-300",
        isOpen ? "w-64 p-4" : "w-0 p-0",
        className
      )}
    >
      {isOpen && children}
    </aside>
  );
}

export function LocalSidebarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}

export function LocalSidebarContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1", className)} {...props} />;
}

export function LocalSidebarGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}

export function LocalSidebarGroupLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mb-2 text-sm font-medium text-muted-foreground", className)}
      {...props}
    />
  );
}

export function LocalSidebarGroupContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1", className)} {...props} />;
}

export function LocalSidebarMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("space-y-1", className)} {...props} />;
}

export function LocalSidebarMenuItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("relative", className)} {...props} />;
}

export function LocalSidebarMenuButton({
  className,
  asChild = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "flex w-full items-center gap-2 rounded-md p-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    />
  );
}
