-- CreateEnum
CREATE TYPE "AlbumType" AS ENUM ('SINGLE', 'LIVE');

-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumnnailUrl" TEXT NOT NULL,
    "type" "AlbumType" NOT NULL DEFAULT 'SINGLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channelUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "youtubeVideoId" TEXT NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "originalTitle" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumnnailUrl" TEXT NOT NULL,
    "playlistId" TEXT,
    "albumId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArtistToVideo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Album_title_key" ON "Album"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_channelUrl_key" ON "Artist"("name", "channelUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Video_youtubeVideoId_start_end_key" ON "Video"("youtubeVideoId", "start", "end");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToVideo_AB_unique" ON "_ArtistToVideo"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToVideo_B_index" ON "_ArtistToVideo"("B");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToVideo" ADD CONSTRAINT "_ArtistToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToVideo" ADD CONSTRAINT "_ArtistToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
