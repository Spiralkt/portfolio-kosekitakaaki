// "use client";

export const PostDetailPDF = () => {
  const data = {
    title: "hey",
    content: "",
    image_url:
      "https://hkcsdzcvpvwjalyssyrc.supabase.co/storage/v1/object/public/post-images/1773fd03-bba8-4ac6-9d19-6edc4da5322e",
  };

  return (
    <div className="flex max-h-full w-full flex-col justify-center">
      <iframe
        src={data.image_url}
        className="grid min-h-svh lg:grid-cols-2"
      ></iframe>
    </div>
  );
};

export default PostDetailPDF;
