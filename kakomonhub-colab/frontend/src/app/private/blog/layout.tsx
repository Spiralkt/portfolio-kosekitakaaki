import { LocalSidebarProvider } from "@/components/ui/LocalSidebar";
import Header from "./Header";
import LocalSidebarNote from "./LocalSidebar_Note";
import NoteProvider from "../../../providers/NoteProvider";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NoteProvider>
      <LocalSidebarProvider>
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <div className="flex flex-1">
            <LocalSidebarNote />
            <main className="flex h-full w-full flex-col">{children}</main>
          </div>
        </div>
      </LocalSidebarProvider>
    </NoteProvider>
  );
}
