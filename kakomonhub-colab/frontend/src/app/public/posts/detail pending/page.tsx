// import { prisma } from "@/db/prisma";
// import Image from "next/image";
import { PostDetail } from "./PostDetail";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
  const postIdParam = (await searchParams).postId;

  const postId = Array.isArray(postIdParam)
    ? postIdParam![0]
    : postIdParam || "";

  //   const post = await prisma.post.findUnique({
  //     where: { id: postId },
  //   });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      {postId ? <PostDetail postId={postId} /> : redirect(".")}
    </div>
  );
}
