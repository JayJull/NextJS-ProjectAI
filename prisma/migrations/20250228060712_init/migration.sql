/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Ai` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ai_name_key" ON "Ai"("name");
