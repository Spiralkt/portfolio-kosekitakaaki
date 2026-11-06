// "use client";

// import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { useTransition } from "react";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { Lecture } from "@prisma/client";
// import { registerLectureAction } from "@/actions/lectures";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { CardContent } from "@/components/ui/card";

// export default function RegisterLecture() {
//   const [title, setTitle] = useState<string>("");
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     startTransition(async () => {
//       const uuid = uuidv4();
//       const lecture = {
//         lecture: { id: uuid, title } as Lecture,
//       };

//       const errorMessage = (await registerLectureAction(lecture)).errorMessage;
//       if (!errorMessage) {
//         router.push(`/public/posts/createpost`);
//         toast.success("Registered a new Lecture!");
//       } else {
//         toast.error(errorMessage);
//       }
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardContent className="grid w-full items-center gap-6">
//         <div className="grid gap-3">
//           <Label htmlFor="title">Lecture Title</Label>
//           <Input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             disabled={isPending}
//             placeholder="Linear Algebra A"
//           />
//         </div>
//         <Button type="submit" disabled={isPending} className="w-full">
//           {isPending ? "Regstering..." : "Register Lecture"}
//         </Button>
//       </CardContent>
//     </form>
//   );
// }
