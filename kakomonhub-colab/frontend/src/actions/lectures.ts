"use server";

import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import { Lecture } from "@prisma/client";
// import { revalidatePath } from "next/cache";

type Props = {
  userId: string;
  lecture: Lecture;
};

export const registerLectureAction = async ({ userId, lecture }: Props) => {
  try {
    await prisma.lecture.create({
      data: {
        title: lecture.title,
        registrarId: userId,
        lastEditorId: userId,
      },
    });

    // revalidatePath("/public/posts/createpost"); no need since we use reat-query.
    return { data: true, error: null };
  } catch (error) {
    return { data: null, error: handleError(error).errorMessage };
  }
};

export const getLecturesAction = async () => {
  try {
    const lectures = await prisma.lecture.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        title: true,
      },
    });

    return { data: lectures, error: null };
  } catch (error) {
    return { data: null, error: handleError(error).errorMessage };
  }
};
