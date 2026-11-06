"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Lecture } from "@prisma/client";
import { registerLectureAction } from "@/actions/lectures";

export default function RegisterLecture() {
  const [title, setTitle] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const uuid = uuidv4();
      const lecture = {
        lecture: { id: uuid, title } as Lecture,
      };

      const errorMessage = (await registerLectureAction(lecture)).errorMessage;
      if (!errorMessage) {
        router.push(`/public/posts/createpost`);
        toast.success("Registered a new Lecture!");
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Lecture Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Regstering..." : "Register Lecture"}
      </button>
    </form>
  );
}
