/*
  Warnings:

  - You are about to drop the column `channelUrl` on the `Artist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,channelId]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `channelId` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Artist_name_channelUrl_key";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "channelUrl",
ADD COLUMN     "channelId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_channelId_key" ON "Artist"("name", "channelId");
