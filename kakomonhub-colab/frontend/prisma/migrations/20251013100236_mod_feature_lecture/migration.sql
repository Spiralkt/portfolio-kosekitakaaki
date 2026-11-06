/*
  Warnings:

  - You are about to drop the column `lecturer_id` on the `Lecture` table. All the data in the column will be lost.
  - Added the required column `lecture_id` to the `Lecturer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Lecture" DROP CONSTRAINT "Lecture_lecturer_id_fkey";

-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "lecturer_id";

-- AlterTable
ALTER TABLE "Lecturer" ADD COLUMN     "lecture_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Lecturer" ADD CONSTRAINT "Lecturer_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
