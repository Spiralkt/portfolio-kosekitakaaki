import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import RegisterLecture from "./RegisterLecture";
import RegisterLecture from "./RegisterLecture copy";
export default function Page() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col">
        <Card className="grid w-full items-center gap-6">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Register Lecture</CardTitle>
            <CardDescription>
              Check if there haven&apos;t registered already.
            </CardDescription>
          </CardHeader>
          <RegisterLecture />
        </Card>
      </div>
      <h2>Thanks a lot for your contribution!</h2>
      <h2>There needs searching function</h2>
      <h2>Pruning if there are NOT ANY Posts on the lecture</h2>{" "}
    </div>
  );
}
