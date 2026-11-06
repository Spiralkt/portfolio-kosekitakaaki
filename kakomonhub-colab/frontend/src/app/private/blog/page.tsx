import { getUser } from "@/actions/auth";
import { prisma } from "@/db/prisma";
// import NewNoteButton from "./NewNoteButton";
import NoteTextInput from "./NoteTextInput";
import Image from "next/image";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
  const noteIdParam = (await searchParams).noteId;
  const user = await getUser();

  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0]
    : noteIdParam || "";

  const note = await prisma.note.findUnique({
    where: { id: noteId, authorId: user?.id },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <div></div>
      {/* <div className="flex w-full max-w-7xl justify-end gap-2">
        <NewNoteButton user={user} />
      </div> */}
      {noteId ? (
        <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />
      ) : (
        <>
          {" "}
          <div className="grid min-h-svh lg:grid-cols-2">
            <div>
              <h1>nothing to show here.</h1>
              <div className="">create new note or select existing note</div>
            </div>
            <div className="bg-muted relative hidden lg:block">
              <Image
                src="/serpentLib.svg"
                alt="show high ranked PDFs, to inspire users"
                className="object-cover dark:brightness-[0.2] dark:grayscale"
                fill
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
