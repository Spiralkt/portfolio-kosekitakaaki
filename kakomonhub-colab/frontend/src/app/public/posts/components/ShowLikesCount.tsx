"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLikesCountAction } from "../clientActions/likes";

type Props = {
  postId: string;
};

const fetchLikesCount = async ({ postId }: Props): Promise<number> => {
  const { data: LikesCount, error } = await getLikesCountAction({ postId });
  if (error) throw new Error(error);

  return LikesCount as number;
};

export const ShowLikesCount = ({ postId }: Props) => {
  // const queryClient = useQueryClient();

  const {
    data: LikesCount,
    isLoading,
    error,
  } = useQuery<number, Error>({
    queryKey: ["LikesCount", postId],
    queryFn: () => fetchLikesCount({ postId }),
    refetchInterval: 60 * 1000,
  });

  // const { mutate } = useMutation({
  //   mutationFn: () => {
  //     return fetchLikesCount({ postId });
  //   },

  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["LikesCount", postId] });
  //   },
  // });

  if (isLoading) {
    return <div> Loading likes...</div>;
  }

  if (error) {
    return <div> Error: {error.message}</div>;
  }

  return <>{LikesCount}</>;
};
