/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Lecture` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registrarId` to the `Lecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrarId` to the `Lecturer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lecture" ADD COLUMN     "registrarId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lecturer" ADD COLUMN     "registrarId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Lecture_title_key" ON "Lecture"("title");

-- AddForeignKey
ALTER TABLE "Lecturer" ADD CONSTRAINT "Lecturer_registrarId_fkey" FOREIGN KEY ("registrarId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_registrarId_fkey" FOREIGN KEY ("registrarId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
