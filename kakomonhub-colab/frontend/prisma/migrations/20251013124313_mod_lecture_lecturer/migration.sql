/*
  Warnings:

  - You are about to drop the column `lecture_id` on the `Lecturer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[institute]` on the table `Lecture` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[institute]` on the table `Lecturer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lastEditorId` to the `Lecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastEditorId` to the `Lecturer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Lecturer" DROP CONSTRAINT "Lecturer_lecture_id_fkey";

-- DropIndex
DROP INDEX "public"."Lecture_title_key";

-- AlterTable
ALTER TABLE "Lecture" ADD COLUMN     "aliases" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "institute" TEXT NOT NULL DEFAULT 'Tohoku University',
ADD COLUMN     "lastEditorId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Lecturer" DROP COLUMN "lecture_id",
ADD COLUMN     "aliases" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "institute" TEXT NOT NULL DEFAULT 'Tohoku University',
ADD COLUMN     "lastEditorId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Lecture_Lecturer" (
    "id" TEXT NOT NULL,
    "lecturer_id" TEXT NOT NULL,
    "lecture_id" TEXT NOT NULL,

    CONSTRAINT "Lecture_Lecturer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lecture_institute_key" ON "Lecture"("institute");

-- CreateIndex
CREATE UNIQUE INDEX "Lecturer_institute_key" ON "Lecturer"("institute");

-- AddForeignKey
ALTER TABLE "Lecturer" ADD CONSTRAINT "Lecturer_lastEditorId_fkey" FOREIGN KEY ("lastEditorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_lastEditorId_fkey" FOREIGN KEY ("lastEditorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture_Lecturer" ADD CONSTRAINT "Lecture_Lecturer_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "Lecturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture_Lecturer" ADD CONSTRAINT "Lecture_Lecturer_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
