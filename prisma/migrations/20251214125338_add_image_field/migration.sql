/*
  Warnings:

  - You are about to drop the `_TodoAssignees` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_authorId_fkey";

-- DropForeignKey
ALTER TABLE "_TodoAssignees" DROP CONSTRAINT "_TodoAssignees_A_fkey";

-- DropForeignKey
ALTER TABLE "_TodoAssignees" DROP CONSTRAINT "_TodoAssignees_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_TodoAssignees";

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
