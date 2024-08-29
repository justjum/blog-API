/*
  Warnings:

  - The `createdAt` column on the `Comment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `createdAt` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP;
