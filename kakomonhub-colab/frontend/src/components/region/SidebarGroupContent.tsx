"use client";

import { Note } from "@prisma/client";

type Props = {
  notes: Note[];
};

export default function SidebarGroupContent({ notes }: Props) {
  console.log(notes);
  return <div>your notes here.</div>;
}
