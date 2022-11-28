/*
  Warnings:

  - You are about to drop the `_AlbumToVideo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArtistToVideo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlaylistToVideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AlbumToVideo" DROP CONSTRAINT "_AlbumToVideo_A_fkey";

-- DropForeignKey
ALTER TABLE "_AlbumToVideo" DROP CONSTRAINT "_AlbumToVideo_B_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToVideo" DROP CONSTRAINT "_ArtistToVideo_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToVideo" DROP CONSTRAINT "_ArtistToVideo_B_fkey";

-- DropForeignKey
ALTER TABLE "_PlaylistToVideo" DROP CONSTRAINT "_PlaylistToVideo_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlaylistToVideo" DROP CONSTRAINT "_PlaylistToVideo_B_fkey";

-- DropTable
DROP TABLE "_AlbumToVideo";

-- DropTable
DROP TABLE "_ArtistToVideo";

-- DropTable
DROP TABLE "_PlaylistToVideo";

-- CreateTable
CREATE TABLE "albums_videos" (
    "albumId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "albums_videos_pkey" PRIMARY KEY ("albumId","videoId")
);

-- CreateTable
CREATE TABLE "artists_videos" (
    "artistId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "artists_videos_pkey" PRIMARY KEY ("artistId","videoId")
);

-- CreateTable
CREATE TABLE "playlists_videos" (
    "playlistId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "playlists_videos_pkey" PRIMARY KEY ("playlistId","videoId")
);

-- AddForeignKey
ALTER TABLE "albums_videos" ADD CONSTRAINT "albums_videos_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "albums_videos" ADD CONSTRAINT "albums_videos_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artists_videos" ADD CONSTRAINT "artists_videos_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artists_videos" ADD CONSTRAINT "artists_videos_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlists_videos" ADD CONSTRAINT "playlists_videos_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlists_videos" ADD CONSTRAINT "playlists_videos_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
