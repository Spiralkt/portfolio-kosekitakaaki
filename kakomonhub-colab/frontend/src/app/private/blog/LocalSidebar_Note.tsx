import { getUser } from "@/actions/auth";
import {
  LocalSidebar,
  LocalSidebarContent,
  LocalSidebarHeader,
} from "@/components/ui/LocalSidebar";
import { prisma } from "@/db/prisma";
import { Note } from "@prisma/client";
import LocalSidebarGroupContent_Note from "./LocalSidebarGroupContent_Note";
import NewNoteButton from "./NewNoteButton";

export default async function LocalSidebar_Note() {
  const user = await getUser();

  let notes: Note[] = [];

  if (user) {
    notes = await prisma.note.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  return (
    <LocalSidebar>
      <LocalSidebarHeader className="relative flex justify-center gap-3 justify-end items-center">
        <div className="mt-2 mb-2 text-md">Your Notes</div>
        <NewNoteButton user={user} />
      </LocalSidebarHeader>
      <LocalSidebarContent>
        <LocalSidebarGroupContent_Note notes={notes} />
      </LocalSidebarContent>
    </LocalSidebar>
  );
}
