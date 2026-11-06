"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    // maybe validate or call an API first
    toast.success("Logged in!");
    router.push("/dashboard");
  };

  return (
    <div>
      <Button asChild onClick={handleLogin}>
        <button>go to dashboard</button>
      </Button>
    </div>
    // <div></div>
  );
}
