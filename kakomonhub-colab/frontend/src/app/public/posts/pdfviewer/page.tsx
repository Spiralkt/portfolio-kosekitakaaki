import { LocalSidebarProvider } from "@/components/ui/LocalSidebar_fixed";
import { LocalAppSidebar } from "./LocalAppSidebar/LocalAppSidebar";

import { redirect } from "next/navigation";
import { PostDetail } from "./PostDetail";

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
    <LocalSidebarProvider
      style={
        {
          "--local-sidebar-width": "400px",
        } as React.CSSProperties
      }
    >
      <LocalAppSidebar />{" "}
      {/* probably should give the postId, preventing redundant fetch. */}
      <div className="flex max-h-full w-full flex-col justify-center">
        {postId ? <PostDetail postId={postId} /> : redirect(".")}
      </div>
    </LocalSidebarProvider>
  );
}
