const THUMB_TYPES = [
  /** w1280 */
  'maxresdefault.jpg',
  /** w640 */
  'sddefault.jpg',
  /** w480 */
  'hqdefault.jpg',
  /** w320 */
  'mqdefault.jpg',
  /** w120 */
  'default.jpg',
]

export async function fetchThumbnailUrl(videoId: string) {
  // 画像をロードする処理
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.src = src
    })
  }

  for (let i = 0; i < THUMB_TYPES.length; i++) {
    const fileName = `https://img.youtube.com/vi/${videoId}/${THUMB_TYPES[i]}`
    const res = await loadImage(fileName)

    // ダミー画像じゃなかったら（横幅が121px以上だったら）
    // もしくは、これ以上小さい解像度が無かった場合は、このURLで決定
    if (!THUMB_TYPES[i + 1] || res.width > 120) {
      return fileName
    }
  }
}
