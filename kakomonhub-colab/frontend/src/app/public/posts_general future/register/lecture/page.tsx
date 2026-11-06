import RegisterLecture from "./RegisterLecture";
export default function Page() {
  return (
    <div>
      <h2>There needs confirmation before registering.</h2>
      <h2>And, searching function</h2>
      <h2>Pluning if there are NOT ANY Posts on the lecture</h2>{" "}
      <RegisterLecture />
    </div>
  );
}
