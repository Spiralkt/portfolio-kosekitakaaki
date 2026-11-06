"use client";

import { useSearchParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useEffect, useState } from "react";
import useNote from "@/hooks/notes/useNote";
import { updateNoteAction } from "@/actions/notes";
import { CloudCheck, CloudUpload, RefreshCw } from "lucide-react";

type Props = {
  noteId: string;
  startingNoteText: string;
};

let updateTimeout: NodeJS.Timeout;

const config = {
  debounceTimeout: 1500,
};

function NoteTextInput({ noteId, startingNoteText }: Props) {
  const noteIdParam = useSearchParams().get("noteId") || "";
  const { noteText, setNoteText } = useNote();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (noteIdParam === noteId) {
      setNoteText(startingNoteText);
    }
  }, [startingNoteText, noteIdParam, noteId, setNoteText]);

  const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLoading(true);

    const text = e.target.value;

    setNoteText(text); // let noteText accessible from other components. global context.

    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(async () => {
      const errorMessage = (await updateNoteAction(noteId, text)).errorMessage;
      if (!errorMessage) {
        setLoading(false);
      }
    }, config.debounceTimeout);
  };

  return (
    <div className="flex h-full w-full flex-col gap-2 items-center">
      <div className="flex w-full max-w-7xl items-center justify-end">
        {loading ? <RefreshCw /> : <CloudCheck />}
      </div>
      <Textarea
        value={noteText}
        onChange={handleUpdateNote}
        placeholder="Type your notes here.."
        className="custom-scrollbar placeholder:text-muted-foreground mb-4 h-full max-w-7xl resize-none border p-4 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
}

export default NoteTextInput;
