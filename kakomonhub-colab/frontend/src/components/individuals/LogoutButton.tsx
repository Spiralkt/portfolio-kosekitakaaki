"use client";

import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logOutAction } from "@/actions/actionsClient/users";
import { useTransition } from "react";

export default function LogoutButton() {
  const router = useRouter();
  // const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      // Simulate an async logout operation
      await logOutAction();
      // if (loading) toast.loading("Logging out...");

      toast.success("Logged out successfully!"); // if error, redirected to `/error` by `logOutAction` .
      router.replace("/");
    });
  };

  return (
    <Button
      variant={"outline"}
      onClick={handleLogout}
      className="w-24"
      disabled={isPending}
    >
      {isPending ? <Loader2 className="animate-spin" /> : "Log out"}
    </Button>
  );
}
