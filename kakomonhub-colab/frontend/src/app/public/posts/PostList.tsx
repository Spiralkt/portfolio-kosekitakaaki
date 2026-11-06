"use client";

import { useQuery } from "@tanstack/react-query";
import { PostItem } from "./PostItem";
import { Post } from "@prisma/client";
import { getPostsAction } from "@/actions/posts";

const fetchPosts = async (): Promise<Post[]> => {
  const { data, error } = await getPostsAction();
  if (error) throw new Error("Could not fetch posts. Please try again.");

  return (data as Post[]) || [];
};

export const PostList = () => {
  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <div> Loading posts...</div>;
  }

  if (error) {
    return <div> Error: {error.message}</div>;
  }

  console.log(data);

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {data?.map((post: Post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
};
