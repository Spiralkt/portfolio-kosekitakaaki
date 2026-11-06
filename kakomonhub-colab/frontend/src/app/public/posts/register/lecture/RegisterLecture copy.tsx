"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Lecture } from "@prisma/client";
import { registerLectureAction } from "@/actions/lectures";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/providers/AuthProvider";
import { Switch } from "@/components/ui/switch";

export default function RegisterLecture() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [isMultipleSubmitEnabled, setIsMultipleSubmitEnabled] =
    useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const { user } = useAuth();
  const userId = user?.id;

  // reset action aggregated. including aliases, description.
  const resetRegistration = () => {
    setTitle(""); // Reset input for the next entry
  };

  // 1. This function is called when the form is submitted.
  // It prevents the default browser action and opens the confirmation dialog.
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) {
      toast.error("You must be logged in to register a lecture!!");
      return;
    }
    setIsDialogOpen(true);
  };

  // 2. This function is called ONLY when the "Confirm" button
  // in the dialog is clicked.
  const handleConfirmation = () => {
    if (!userId) {
      toast.error("You must be logged in to register a lecture!");
      return;
    }
    startTransition(async () => {
      const lecture = { title } as Lecture;

      const { error } = await registerLectureAction({ userId, lecture });
      if (!error) {
        toast.success("Registered new lecture!");
        if (!isMultipleSubmitEnabled) {
          router.push(`/public/posts/createpost`);
        } else {
          resetRegistration();
        }
      } else {
        toast.error(error);
      }

      // Close the dialog after the action is complete
      setIsDialogOpen(false);
    });
  };

  return (
    // The AlertDialog is now controlled by the `isDialogOpen` state
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <CardHeader className="justify-end">
        <Label className="flex items-center gap-2 text-sm">
          <span>Submit multiple times</span>
          <Switch
            checked={isMultipleSubmitEnabled}
            onCheckedChange={setIsMultipleSubmitEnabled}
            className="shadow-none"
          />
        </Label>
      </CardHeader>
      <form onSubmit={handleFormSubmit}>
        <CardContent className="grid w-full items-center gap-6">
          <div className="grid gap-3">
            <Label htmlFor="title">
              Lecture Title<span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isPending}
              placeholder="e.g., Linear Algebra A"
            />
          </div>
          {/* This button's type="submit" triggers handleFormSubmit, opening the dialog */}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Register Lecture"
            )}
          </Button>
        </CardContent>
      </form>

      {/* The content of the confirmation dialog */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Registration</AlertDialogTitle>
          <AlertDialogDescription>
            Aint there typo or already booked?:{" "}
            <span className="text-red-500">{title}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmation}
            disabled={isPending}
            className="w-28" // Adjusted width for new text
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
