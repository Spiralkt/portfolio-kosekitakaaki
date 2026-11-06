"use server";

import { handleError } from "@/lib/utils";
import { prisma } from "@/db/prisma";

type Props = {
  postId: string;
  userId: string;
};

type LikeCountInput = {
  postId: string;
};

export const createLikeAction = async ({ postId, userId }: Props) => {
  try {
    await prisma.like.create({
      data: {
        postId: postId,
        userId: userId,
      },
    });

    return { data: true, error: null };
  } catch (error) {
    return { data: null, error: handleError(error).errorMessage };
  }
};

export const deleteALikeAction = async ({ postId, userId }: Props) => {
  try {
    await prisma.like.delete({
      where: {
        userId_postId: {
          userId: userId,
          postId: postId,
        },
      },
    });

    return { data: true, error: null };
  } catch (error) {
    return { data: null, error: handleError(error).errorMessage };
  }
};

export const getALikeAction = async ({ postId, userId }: Props) => {
  try {
    const res = await prisma.like.findUnique({ // need `res` for checking if the record exists, while successing the prisma action. 
      where: {
        userId_postId: {
          userId: userId,
          postId: postId,
        },
      },
    });

    return { data: res, error: null };
  } catch (error) {
    return { data: null, error: handleError(error).errorMessage };
  }
};

export const getLikesCountAction = async ({ postId }: LikeCountInput) => {
  try {
    const LikesCount = await prisma.like.count({ // if there are no entries to count, LikesCount will be 0.
      where: {
        postId: postId,
      },
    });

    return { data: LikesCount, error: null }; // data be always number.
  } catch (error) {
    return { data: null, error: handleError(error).errorMessage };
  }
};
