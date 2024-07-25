/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserImage_userId_key" ON "UserImage"("userId");
