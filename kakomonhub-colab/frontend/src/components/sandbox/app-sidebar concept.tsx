"use client";

// import {
//   AudioWaveform,
//   BookOpen,
//   Bot,
//   Command,
//   Frame,
//   GalleryVerticalEnd,
//   Map,
//   PieChart,
//   Settings2,
//   SquareTerminal,
// } from "lucide-react";

// import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/sandbox/nav-user copy";
// import { TeamSwitcher } from "@/components/team-switcher copy";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import { createClient } from "@/utils/supabase/server";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/individuals/ModeToggle";
import {
  FeedClientMenuItemHeader,
  FeedClientNavMain,
  FeedClientNavProjects,
} from "@/components/sandbox/FeedClient";
import { LogIn } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  // Create a user object with data from Supabase, providing default values.
  const userData = {
    name: user?.user_metadata?.name || user?.email || "Anonymous",
    email: user?.email || "Not logged in",
    avatar: user?.user_metadata?.avatar_url || "/avatars/knowledgeTree.svg",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <SidebarTrigger className="size-9" />
        </div>
        <SidebarMenuItem>
          {/* Logo */}
          <FeedClientMenuItemHeader />
        </SidebarMenuItem>
        {/* <TeamSwitcher teams={sampleData.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <FeedClientNavProjects />
        <FeedClientNavMain />
        {/* <NavMain items={sampleData.navMain} />
        <NavProjects projects={sampleData.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        {/* Pass the clean userData object to NavUser */}
        {user ? (
          <NavUser user={userData} />
        ) : (
          <>
            {/* <Button variant={"outline"}> */}
            <Link href="/login">
              <SidebarMenuButton
                // variant={'default'}
                className="bg-sidebar-primary text-sidebar-primary-foreground"
              >
                <LogIn />
                <span>Login</span>
              </SidebarMenuButton>
            </Link>
            {/* </Button> */}
          </>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
