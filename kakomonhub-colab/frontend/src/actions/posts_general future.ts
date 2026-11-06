"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "@/actions/auth";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import { Post } from "@prisma/client";

export interface PostInput {
  title: string;
  content: string;
  lecture_id: string;
  lecturer_id: string;
}

export const createPostAction = async (
  postId: string,
  post: PostInput,
  image_url: string,
) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to create a post!");

    await prisma.post.create({
      data: {
        id: postId,
        title: post.title,
        content: post.content,
        lecture_id: post.lecture_id,
        lecturer_id: post.lecturer_id,

        image_url: image_url,

        authorId: user.id,
      },
    });

    revalidatePath("/public/posts_general"); // ? can be: no need since we use react-query for real time fetching.
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const getPostsAction = async () => {
  try {
    // const user = await getUser();
    // if (!user) throw new Error("You must be logged in to view posts");

    const posts = await prisma.post.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      take: 10,
    });

    return { data: posts, error: null };
  } catch (error) {
    return { data: null, error: handleError(error).errorMessage };
  }
};

export const getAPostAction = async (postId: string) => {
  try {
    // const user = await getUser();
    // if (!user) throw new Error("You must be logged in to view posts");

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    return { data: post, error: null };
  } catch (error) {
    return { data: null, error: handleError(error).errorMessage };
  }
};

// export const updatePostAction = async (noteId: string, text: string) => {
//   try {
//     const user = await getUser();
//     if (!user) throw new Error("You must be logged in to update a note");

//     await prisma.note.update({
//       where: { id: noteId },
//       data: { text },
//     });

//     return { errorMessage: null };
//   } catch (error) {
//     return handleError(error);
//   }
// };
