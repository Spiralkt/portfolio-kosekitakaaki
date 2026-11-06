import RegisterLectureR from "./RegisterLectureR";
export default function Page() {
  return (
    <div>
      <h2>There needs confirmation before registering.</h2>
      <h2>And, searching function</h2>
      <h2>Pluning if there are NOT ANY Posts on the lecturer</h2>
      {" "}
      <RegisterLectureR />
    </div>
  );
}
