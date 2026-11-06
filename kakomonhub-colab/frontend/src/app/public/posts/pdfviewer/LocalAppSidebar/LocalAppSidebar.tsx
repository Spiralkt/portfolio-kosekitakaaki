"use client";

import * as React from "react";
import { ArchiveX, Command, File, Inbox, Send, Trash2 } from "lucide-react";
import { Undo2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  LocalSidebar,
  LocalSidebarContent,
  LocalSidebarFooter,
  LocalSidebarGroup,
  LocalSidebarGroupContent,
  LocalSidebarHeader,
  LocalSidebarInput,
  LocalSidebarMenu,
  LocalSidebarMenuButton,
  LocalSidebarMenuItem,
  useLocalSidebar,
  LocalSidebarTrigger,
} from "@/components/ui/LocalSidebar_fixed";
import { Switch } from "@/components/ui/switch";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import CommentSection from "../CommentSection";
import { LikeButton } from "../LocalAppSidebarEntries/LikeButton";

// This is sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Description",
      url: "#",
      icon: Inbox,
      isActive: true,
    },
    {
      title: "Comments",
      url: "#",
      icon: File,
      isActive: false,
    },
  ],
  mails: [
    {
      name: "William Smith",
      email: "williamsmith@example.com",
      subject: "Meeting Tomorrow",
      date: "09:34 AM",
      teaser:
        "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
    },
    {
      name: "William Smith",
      email: "williamsmith@example.com",
      subject: "Meeting Tomorrow",
      date: "09:34 AM",
      teaser:
        "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
    },
  ],
};

export function LocalAppSidebar({
  ...props
}: React.ComponentProps<typeof LocalSidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const [mails, setMails] = React.useState(data.mails);
  const { setOpen } = useLocalSidebar();

  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");

  return (
    <LocalSidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <LocalSidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <LocalSidebarHeader>
          <div className="bg-sidebar-secondary text-sidebar-secondary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <LocalSidebarTrigger className="size-9" />
          </div>
        </LocalSidebarHeader>
        <LocalSidebarContent>
          <LocalSidebarGroup>
            <LocalSidebarGroupContent className="px-1.5 md:px-0">
              <LocalSidebarMenu>
                {postId && <LikeButton postId={postId} />}

                {data.navMain.map((item) => (
                  <LocalSidebarMenuItem key={item.title}>
                    <LocalSidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item);
                        const mail = data.mails.sort(() => Math.random() - 0.5);
                        setMails(
                          mail.slice(
                            0,
                            Math.max(5, Math.floor(Math.random() * 10) + 1),
                          ),
                        );
                        setOpen(true);
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </LocalSidebarMenuButton>
                  </LocalSidebarMenuItem>
                ))}
              </LocalSidebarMenu>
            </LocalSidebarGroupContent>
          </LocalSidebarGroup>
        </LocalSidebarContent>
        <LocalSidebarFooter>
          <Button onClick={() => router.back()} variant={"secondary"}>
            <Undo2 />
          </Button>
        </LocalSidebarFooter>
      </LocalSidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <LocalSidebar collapsible="none" className="hidden flex-1 md:flex">
        <LocalSidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem?.title}
            </div>
            <Label className="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <Switch className="shadow-none" />
            </Label>
          </div>
          <LocalSidebarInput placeholder="Type to search..." />
        </LocalSidebarHeader>
        <LocalSidebarContent>
          <LocalSidebarGroup className="px-0">
            <LocalSidebarGroupContent>
              {/* {mails.map((mail) => (
                <a
                  href="#"
                  key={mail.email}
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{mail.name}</span>{" "}
                    <span className="ml-auto text-xs">{mail.date}</span>
                  </div>
                  <span className="font-medium">{mail.subject}</span>
                  <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                    {mail.teaser}
                  </span>
                </a>
              ))} */}

              <CommentSection />
            </LocalSidebarGroupContent>
          </LocalSidebarGroup>
        </LocalSidebarContent>
      </LocalSidebar>
    </LocalSidebar>
  );
}
