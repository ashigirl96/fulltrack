/*
  Warnings:

  - You are about to drop the column `thumnnailUrl` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `thumnnailUrl` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `thumnnailUrl` on the `Video` table. All the data in the column will be lost.
  - Added the required column `thumbnailUrl` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "thumnnailUrl",
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "thumnnailUrl",
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "thumnnailUrl",
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL;
