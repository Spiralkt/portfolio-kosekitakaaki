/*
  Warnings:

  - You are about to drop the column `lecturer_id` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_lecturer_id_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "lecturer_id";
