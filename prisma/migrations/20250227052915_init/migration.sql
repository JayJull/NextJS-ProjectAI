/*
  Warnings:

  - You are about to drop the column `deskripsi` on the `Ai` table. All the data in the column will be lost.
  - Added the required column `longDesc` to the `Ai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDesc` to the `Ai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ai" DROP COLUMN "deskripsi",
ADD COLUMN     "click" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "longDesc" TEXT NOT NULL,
ADD COLUMN     "shortDesc" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
