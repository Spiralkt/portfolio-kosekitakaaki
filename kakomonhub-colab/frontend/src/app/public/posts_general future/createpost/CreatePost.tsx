"use client";

import { ChangeEvent, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { createPostAction } from "@/actions/posts";
import { v4 as uuidv4 } from "uuid";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import Select from "react-select";

import { PostInput } from "@/actions/posts";
import { Lecture, Lecturer } from "@prisma/client";
import { getLecturesAction } from "@/actions/lectures";
import { getLectureRsAction } from "@/actions/lectureRs";

type OptionType = {
  value: string;
  label: string;
};

const bucket = "post-images";

const fetchLectures = async (): Promise<Lecture[]> => {
  const { data, error } = await getLecturesAction();
  if (error) throw new Error("Could not fetch lectures. Please try again.");

  return (data as Lecture[]) || [];
};
const fetchLectureRs = async (): Promise<Lecturer[]> => {
  const { data, error } = await getLectureRsAction();
  if (error) throw new Error("Could not fetch lecturers. Please try again.");

  return (data as Lecturer[]) || [];
};

export const CreatePost = () => {
  // const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [isPending, startTransition] = useTransition();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [lectureId, setLectureId] = useState<string>("");
  const [lectureRId, setLectureRId] = useState<string>("");
  // const [formError, setFormError] = useState<string | null>(null);

  const [lectureTitle, setLectureTitle] = useState<string>("");
  const [lectureRName, setLectureRName] = useState<string>("");

  const router = useRouter();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const postTitle = `${lectureTitle} ${lectureRName} ${year}.${month}`;

  const {
    data: lectures,
    isLoading: isLoadingLectures,
    isError: isLecturesError,
  } = useQuery<Lecture[], Error>({
    queryKey: ["lectures"], // Unique key for caching
    queryFn: fetchLectures,
  });

  const {
    data: lectureRs,
    isLoading: isLoadingLectureRs,
    isError: isLectureRsError,
  } = useQuery<Lecturer[], Error>({
    queryKey: ["lectureRs"], // Unique key for caching
    queryFn: fetchLectureRs,
  });

  const createPost = ({
    post,
    imageFile,
  }: {
    post: PostInput;
    imageFile: File;
  }) => {
    startTransition(async () => {
      const supabase = await createClient();
      const uuid = uuidv4();

      const filePath = `${uuid}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, imageFile);
      if (uploadError) {
        toast.error("you need to login to upload contents");
      } else {
        const { data: publicURLData } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        const { errorMessage } = await createPostAction(
          uuid,
          post,
          publicURLData.publicUrl,
        );

        if (!errorMessage) {
          router.push(`/public/posts`);
          toast.success("Created a post!");
        } else {
          toast.error(errorMessage);
        }
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setFormError(null);

    // if (!lectureId) {
    //   toast.error("You must select a lecture (Subject title).");
    //   return;
    // }
    // if (!lectureRId) {
    //   toast.error("You must select a lecturer (Human name).");
    //   return;
    // }
    if (!selectedFile) {
      toast.error("You must upload a file.");
      return;
    }

    createPost({
      post: {
        title: postTitle,
        content,
        lecture_id: lectureId,
        lecturer_id: lectureRId,
      },
      imageFile: selectedFile,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Check the file's MIME type
      if (file.type !== "application/pdf") {
        toast.error("Invalid file type. Please upload a PDF.");
        setSelectedFile(null); // Clear the selection
        e.target.value = ""; // Reset the input field
        return;
      }

      // Optional: Check for file size (e.g., max 5MB)
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSizeInBytes) {
        toast.error("File is too large. Maximum size is 5MB.");
        setSelectedFile(null);
        e.target.value = "";
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleLectureChange = (selectedOption: OptionType | null) => {
    setLectureId(selectedOption ? selectedOption.value : "");
    setLectureTitle(selectedOption ? selectedOption.label : "");
  };

  const lectureOptions = lectures?.map((lecture) => ({
    value: lecture.id,
    label: lecture.title,
  }));

  const handleLectureRChange = (selectedOption: OptionType | null) => {
    setLectureRId(selectedOption ? selectedOption.value : "");
    setLectureRName(selectedOption ? selectedOption.label : "");
  };

  const lectureROptions = lectureRs?.map((lectureR) => ({
    value: lectureR.id,
    label: lectureR.name,
  }));

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-4">
      <div>
        <label htmlFor="pdf" className="mb-2 block font-medium">
          Select a File <span className="text-red-500">*</span>{" "}
          {selectedFile ? (
            <span>
              Don&apos;t worry the filename. We don&apos;t store it. ...Rather,
              we elaborately change it to avoid malicious injective actions...
            </span>
          ) : null}
        </label>
        <input
          type="file"
          id="pdf"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full text-gray-200"
          required
        />
      </div>

      <div>
        <label htmlFor="lecture" className="mb-2 block font-medium">
          Choose a Lecture <span className="text-red-500">*</span>
        </label>
        <Select
          id="lecture"
          options={lectureOptions}
          onChange={handleLectureChange}
          isSearchable
          placeholder={isLoadingLectures ? "Loading lectures..." : "Search..."}
          isDisabled={isLoadingLectures || isLecturesError}
          required
        />
        {isLecturesError && (
          <p className="mt-1 text-sm text-red-500">Could not load lectures.</p>
        )}
      </div>

      <div>
        <label htmlFor="lectureR" className="mb-2 block font-medium">
          Choose a Lecturer&apos;s name <span className="text-red-500">*</span>
        </label>
        <Select
          id="lectureR"
          options={lectureROptions}
          onChange={handleLectureRChange}
          isSearchable
          placeholder={
            isLoadingLectureRs ? "Loading lecturers..." : "Search..."
          }
          isDisabled={isLoadingLectureRs || isLectureRsError}
          required
        />
        {isLectureRsError && (
          <p className="mt-1 text-sm text-red-500">Could not load lecturers.</p>
        )}
      </div>

      {/* <div>
        <label htmlFor="title" className="mb-2 block font-medium">
          Title (automatical)
        </label>
        <input
          type="text"
          id="title"
          value={`${lectureTitle} ${lectureRName} ${year}.${month}`}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border border-white/10 bg-transparent p-2"
          // placeholder="Select Lecture and Lecturer first..."
          required
        />
      </div> */}

      <div>
        <label htmlFor="content" className="mb-2 block font-medium">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded border border-white/10 bg-transparent p-2"
          rows={5}
          placeholder={`Optional. e.g., ${lectureRName}'s  ${lectureTitle}  was hard, but was simutaneously substantial. I recommend to take this lecture for enthusiasists.`}
        />
      </div>

      <div>Shown as: {postTitle}</div>

      <button
        type="submit"
        className="cursor-pointer rounded bg-purple-500 px-4 py-2 text-white"
        disabled={isPending}
      >
        {isPending ? "Creating..." : "Create Post"}
      </button>
      {/* {isError && <p className="text-red-500"> Error creating post.</p>} */}
    </form>
  );
};
