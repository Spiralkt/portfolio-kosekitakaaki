-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('default', 'BACHELOR', 'MASTER', 'DOCTOR');

-- DropForeignKey
ALTER TABLE "public"."Lecture_Lecturer" DROP CONSTRAINT "Lecture_Lecturer_lecture_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Lecture_Lecturer" DROP CONSTRAINT "Lecture_Lecturer_lecturer_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "course" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "degree" "Degree" NOT NULL DEFAULT 'default',
ADD COLUMN     "department" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "institute" TEXT NOT NULL DEFAULT 'Tohoku University',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'John Doe',
ADD COLUMN     "year" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Lecture_Lecturer" ADD CONSTRAINT "Lecture_Lecturer_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "Lecturer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture_Lecturer" ADD CONSTRAINT "Lecture_Lecturer_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
