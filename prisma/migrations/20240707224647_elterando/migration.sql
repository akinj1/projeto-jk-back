/*
  Warnings:

  - You are about to drop the `_ImageToProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ImageToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ImageToProducts" DROP CONSTRAINT "_ImageToProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToProducts" DROP CONSTRAINT "_ImageToProducts_B_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToUser" DROP CONSTRAINT "_ImageToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToUser" DROP CONSTRAINT "_ImageToUser_B_fkey";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ImageToProducts";

-- DropTable
DROP TABLE "_ImageToUser";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
