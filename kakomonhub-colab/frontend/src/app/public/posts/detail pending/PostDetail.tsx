"use client";

import { useQuery } from "@tanstack/react-query";
import { Post } from "@prisma/client";
import { getAPostAction } from "@/actions/posts";

type Props = {
  postId: string;
};

const fetchPostById = async (postId: string): Promise<Post> => {
  const { data, error } = await getAPostAction(postId);
  if (error) throw new Error("Could not fetch the post. Please try again.");

  return (data as Post) || null;
};

export const PostDetail = ({ postId }: Props) => {
  const { data, error, isLoading } = useQuery<Post, Error>({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  if (isLoading) {
    return <div> Loading posts...</div>;
  }

  if (error) {
    return <div> Error: {error.message}</div>;
  }

  console.log(data);

  return (
    <div className="space-y-6">
      <h2 className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center text-6xl font-bold text-transparent">
        {data?.title}
      </h2>
      {data?.image_url && (
        <iframe
          src={data.image_url}
          className="grid min-h-svh lg:grid-cols-2"
        />
      )}
      <p className="text-gray-400">{data?.content}</p>
      <p className="text-sm text-gray-500">
        Posted on: {new Date(data!.createdAt).toLocaleDateString()}
      </p>

      {/* <LikeButton postId={postId} /> */}
      {/* <CommentSection postId={postId} /> */}
    </div>
  );
};
