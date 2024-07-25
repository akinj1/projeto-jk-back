/*
  Warnings:

  - Added the required column `key` to the `UserImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `UserImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserImage" ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
