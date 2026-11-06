"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  ChevronRight,
  type LucideIcon,
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { ChevronsUpDown, Plus } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuAction,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This is sample data.
const sampleData = {
  user: {
    name: "John Doe",
    email: "login@example.com",
    avatar: "/avatars/knowledgeTree.svg",
  },
  teams: [
    {
      name: "KakomonHub.org",
      logo: SquareTerminal,
      plan: "sample: subscribed",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

const config = {
  navMain: [
    {
      title: "Menu",
      url: "",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Follow",
          url: "#",
        },
        {
          title: "Bookmark",
          url: "#",
        },
        {
          title: "Like",
          url: "#",
        },
        {
          title: "Public",
          url: "/public",
        },
      ],
    },
    {
      title: "Contribute",
      url: "",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Create Post",
          url: "/public/posts/createpost",
        },
        {
          title: "Register Lecture",
          url: "/public/posts/register/lecture",
        },
        {
          title: "Register Lecturer",
          url: "/public/posts/register/lecturer",
        },
      ],
    },
    {
      title: "Public",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "My Blog",
      url: "/private/blog",
      icon: Frame,
    },
    {
      name: "Dashboard",
      url: "/private/dashboard",
      icon: PieChart,
    },
    {
      name: "Posts",
      url: "/public/posts",
      icon: Map,
    },
  ],
};

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function FeedClientMenuItemHeader() {
  //   {
  //   ...props
  // }: React.ComponentProps<typeof Sidebar>
  // props for importing user data. since this is client side, we can't take in server data.

  // const { isMobile } = useSidebar();
  // const activeTeam = sampleData.teams[0];

  return (
    // <Sidebar collapsible="icon" {...props}>
    //   <SidebarHeader>
    //     <TeamSwitcher teams={sampleData.teams} />
    //   </SidebarHeader>
    //   <SidebarContent>
    //     <NavMain items={sampleData.navMain} />
    //     <NavProjects projects={sampleData.projects} />
    //   </SidebarContent>
    //   <SidebarFooter>
    //     {/* Pass the clean userData object to NavUser */}
    //     <NavUser user={userData} />
    //   </SidebarFooter>
    //   <SidebarRail />
    // </Sidebar>

    <Link href="/">
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        // tooltip={"Home"}
      >
        {/* <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <SquareTerminal className="size-4" />
      </div> */}
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src="/kakomonhub.svg" alt="kakomonhub.org" />
          <AvatarFallback className="rounded-lg">Hub</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">KakomonHub</span>
          {/* <span className="truncate text-xs">sample: Subscribed</span> */}
        </div>
      </SidebarMenuButton>
    </Link>

    // <SidebarMenu>
    //   <SidebarMenuItem>
    //     <DropdownMenu>
    //       <DropdownMenuTrigger asChild>
    //         <SidebarMenuButton
    //           size="lg"
    //           className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    //         >
    //           <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
    //             <activeTeam.logo className="size-4" />
    //           </div>
    //           <div className="grid flex-1 text-left text-sm leading-tight">
    //             <span className="truncate font-medium">{activeTeam.name}</span>
    //             <span className="truncate text-xs">{activeTeam.plan}</span>
    //           </div>
    //           {/* <ChevronsUpDown className="ml-auto" /> */}
    //         </SidebarMenuButton>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent
    //         className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
    //         align="start"
    //         side={isMobile ? "bottom" : "right"}
    //         sideOffset={4}
    //       >
    //         <DropdownMenuLabel className="text-muted-foreground text-xs">
    //           Teams
    //         </DropdownMenuLabel>
    //         {/* {teams.map((team, index) => (
    //           <DropdownMenuItem
    //             key={team.name}
    //             onClick={() => setActiveTeam(team)}
    //             className="gap-2 p-2"
    //           >
    //             <div className="flex size-6 items-center justify-center rounded-md border">
    //               <team.logo className="size-3.5 shrink-0" />
    //             </div>
    //             {team.name}
    //             <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
    //           </DropdownMenuItem>
    //         ))} */}
    //         <DropdownMenuSeparator />
    //         <DropdownMenuItem className="gap-2 p-2">
    //           <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
    //             <Plus className="size-4" />
    //           </div>
    //           <div className="text-muted-foreground font-medium">Add team</div>
    //         </DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   </SidebarMenuItem>
    // </SidebarMenu>
  );
}

export function FeedClientNavMain() {
  // {
  //   items,
  // }: {
  //   items: {
  //     title: string;
  //     url: string;
  //     icon?: LucideIcon;
  //     isActive?: boolean;
  //     items?: {
  //       title: string;
  //       url: string;
  //     }[];
  //   }[];
  // }
  const items = config.navMain;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export function FeedClientNavProjects() {
  //   {
  //   projects,
  // }: {
  //   projects: {
  //     name: string;
  //     url: string;
  //     icon: LucideIcon;
  //   }[];
  // }
  const { isMobile } = useSidebar();
  const projects = config.projects;

  return (
    <SidebarGroup className="group-data-[collapsible=icon]">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild tooltip={item.name}>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
