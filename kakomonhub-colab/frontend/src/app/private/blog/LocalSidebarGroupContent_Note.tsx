"use client";

import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useMemo } from "react";
import {
  LocalSidebarGroupContent,
  LocalSidebarMenu,
  LocalSidebarMenuItem,
  LocalSidebarHeader,
} from "@/components/ui/LocalSidebar";
import Fuse from "fuse.js";

import { Note } from "@prisma/client";
import SelectNoteButton from "./SelectNoteButton";
import DeleteNoteButton from "./DeleteNoteButton";

type Props = {
  notes: Note[];
};

export default function LocalSidebarGroupContent_Note({ notes }: Props) {
  const [searchText, setSearchText] = useState("");
  const [localNotes, setLocalNotes] = useState(notes);
  console.log(notes);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const fuse = useMemo(() => {
    return new Fuse(localNotes, {
      keys: ["text"],
      threshold: 0.4,
    });
  }, [localNotes]);

  const filteredNotes = searchText
    ? fuse.search(searchText).map((result) => result.item)
    : localNotes;

  const deleteNoteLocally = (noteId: string) => {
    setLocalNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== noteId),
    );
  };

  return (
    <LocalSidebarGroupContent>
      <LocalSidebarHeader>
        <div className="relative flex items-center">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <Input
            className="bg-background h-8 w-full pl-8 shadow-none"
            placeholder="Search your notes..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </div>
      </LocalSidebarHeader>
      <LocalSidebarMenu>
        {filteredNotes.map((note) => (
          <LocalSidebarMenuItem key={note.id} className="group/item">
            <SelectNoteButton note={note} />

            <DeleteNoteButton
              noteId={note.id}
              deleteNoteLocally={deleteNoteLocally}
            />
          </LocalSidebarMenuItem>
        ))}
      </LocalSidebarMenu>
    </LocalSidebarGroupContent>
  );
}
