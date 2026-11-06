"use client";

import { useState, useTransition, useEffect } from "react";
import { Loader2, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import {
  createLikeAction,
  deleteALikeAction,
  getALikeAction,
} from "../../clientActions/likes";
import {
  LocalSidebarMenuButton,
  LocalSidebarMenuItem,
} from "@/components/ui/LocalSidebar";
import { useAuth } from "@/providers/AuthProvider";
import { ShowLikesCount } from "../../components/ShowLikesCount";

type Props = {
  postId: string;
};

export function LikeButton({ postId }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isLiked, setLike] = useState<boolean>(false);

  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchLikeStatus = async () => {
      const { data, error } = await getALikeAction({ postId, userId });
      if (!error) {
        if (data) {
          setLike(true);
        }
      } else {
        toast.error("Error fetching Like");
      }
    };

    fetchLikeStatus();
  }, [postId, userId]);

  const handleLikeButton = () => {
    if (!userId) {
      toast.error("You must be logged in to like a post!");
      return;
    }
    startTransition(async () => {
      if (!isLiked) {
        const { error } = await createLikeAction({ postId, userId });
        if (!error) {
          setLike(true);
          toast.success("Added to Like");
        } else {
          toast.error(error);
        }
      } else {
        const { error } = await deleteALikeAction({ postId, userId });
        if (!error) {
          setLike(false);
          toast.success("Removed from Like");
        } else {
          toast.error(error);
        }
      }
    });
  };

  return (
  <LocalSidebarMenuItem >
      <LocalSidebarMenuButton onClick={handleLikeButton} disabled={isPending}>
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <ThumbsUp fill={isLiked ? "black" : "none"} />
        )}
      </LocalSidebarMenuButton>
      <div className="flex justify-center w-full">
        <ShowLikesCount postId={postId} />
      </div>
    </LocalSidebarMenuItem>
  );
}
