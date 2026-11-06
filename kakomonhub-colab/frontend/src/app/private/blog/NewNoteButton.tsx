"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { createNoteAction } from "@/actions/notes";

import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  user: User | null;
};

function NewNoteButton({ user }: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleClickNewNoteButton = () => {
    if (!user) {
      router.push("/login");
    } else {
      startTransition(async () => {
        const uuid = uuidv4();
        await createNoteAction(uuid);
        router.push(`/private/blog/?noteId=${uuid}`);

        toast.success("Created a new note");
      });
    }
  };

  return (
    <Button
      onClick={handleClickNewNoteButton}
      // variant="secondary"
      // variant={"outline"}
      className="w-24"
      disabled={isPending}
    >
      {isPending ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  );
}

export default NewNoteButton;
