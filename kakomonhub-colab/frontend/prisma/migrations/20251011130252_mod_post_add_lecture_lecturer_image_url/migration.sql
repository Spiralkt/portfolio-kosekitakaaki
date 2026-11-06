/*
  Warnings:

  - Added the required column `image_url` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lecture` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lecturer` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "lecture" TEXT NOT NULL,
ADD COLUMN     "lecturer" TEXT NOT NULL;
