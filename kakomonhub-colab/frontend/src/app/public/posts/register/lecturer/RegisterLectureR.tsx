"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Lecturer } from "@prisma/client";
import { registerLectureRAction } from "@/actions/lectureRs";

export default function RegisterLectureR() {
  const [name, setName] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const uuid = uuidv4();
      const lecturer = {
        lecturer: { id: uuid, name } as Lecturer,
      };

      const { error } = await registerLectureRAction(lecturer);

      if (!error) {
        router.push(`/public/posts/createpost`);
        toast.success("Registered a new Lecturer!");
      } else {
        toast.error(error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Lecturer Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Regstering..." : "Register LectureR"}
      </button>
    </form>
  );
}
