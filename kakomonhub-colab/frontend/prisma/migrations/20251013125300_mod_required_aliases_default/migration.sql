/*
  Warnings:

  - Made the column `aliases` on table `Lecture` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department` on table `Lecture` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Lecture` required. This step will fail if there are existing NULL values in that column.
  - Made the column `aliases` on table `Lecturer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department` on table `Lecturer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Lecturer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Lecture" ALTER COLUMN "aliases" SET NOT NULL,
ALTER COLUMN "aliases" SET DEFAULT '',
ALTER COLUMN "department" SET NOT NULL,
ALTER COLUMN "department" SET DEFAULT '',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Lecturer" ALTER COLUMN "aliases" SET NOT NULL,
ALTER COLUMN "aliases" SET DEFAULT '',
ALTER COLUMN "department" SET NOT NULL,
ALTER COLUMN "department" SET DEFAULT '',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '';
