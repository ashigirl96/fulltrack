const videoIdReg = /v=(?<videoId>.{11})/g

export function getVideoIdFromUrl(url: string) {
  const exec = videoIdReg.exec(url)
  if (!exec) return null
  const groups = exec.groups
  if (!groups) return null
  return groups.videoId
}
