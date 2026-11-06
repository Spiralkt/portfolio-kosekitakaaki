"use server";

import { getUser } from "@/actions/auth";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import { Lecturer } from "@prisma/client";

type Props = {
  lecturer: Lecturer;
};

export const registerLectureRAction = async ({ lecturer }: Props) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to register a lecturer!");

    await prisma.lecturer.create({
      data: {
        id: lecturer.id,
        name: lecturer.name,
        registrarId: user.id,
        lastEditorId: user.id,
      },
    });

    // revalidatePath("/public/posts/createpost"); // can be moved.
    return { data: true, error: null };
  } catch (error) {
    return { data: null, error: handleError(error).errorMessage };
  }
};

export const getLectureRsAction = async () => {
  try {
    const lecturers = await prisma.lecturer.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        name: true,
      },
    });

    return { data: lecturers, error: null };
  } catch (error) {
    return { data: null, error: handleError(error).errorMessage };
  }
};
