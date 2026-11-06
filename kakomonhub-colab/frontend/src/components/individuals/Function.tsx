// "use client";

// import { Loader2 } from "lucide-react";
// import { Button } from "../ui/button";
// import { useState } from "react";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { logOutAction } from "@/actions/users";

// export function LogoutFunction() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const handleLogout = async () => {
//     setLoading(true);

//     // Simulate an async logout operation
//     await logOutAction();
//     // if (loading) toast.loading("Logging out...");

//     toast.success("Logged out successfully!"); // if error, redirected to `/error` by `logOutAction` .
//     router.replace("/");

//     setLoading(false);
//   };

//   return (
//     <Button variant={"outline"} onClick={handleLogout} className="w-full">
//       {loading ? <Loader2 className="animate-spin" /> : "Log out"}
//     </Button>
//   );
// }
