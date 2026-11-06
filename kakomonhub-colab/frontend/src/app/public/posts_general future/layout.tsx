import { AppProviders } from "@/providers";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProviders>
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex flex-1">
          <main className="flex h-full w-full flex-col">{children}</main>
        </div>
      </div>
    </AppProviders>
  );
}
