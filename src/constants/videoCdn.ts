/**
 * Video CDN Mapping - Cloudflare R2 via Pages Function
 * All videos are served from /videos/{filename} endpoint
 * Relative paths ensure compatibility across environments
 */
export const VIDEO_CDN = {
  manualForm: '/videos/manualForm.MP4',
  scanPhoto: '/videos/scanPhoto.mp4',
  generateText: '/videos/generateText.MP4',
  chatbot: '/videos/chatbot.MP4',
  exportImport: '/videos/exportImport.MP4',
  chart: '/videos/chart.MP4',
} as const

/**
 * Get video source by index (for backward compatibility)
 * Maps to the order used in features.steps
 */
export const getVideoByIndex = (index: number): string => {
  const videos = [
    VIDEO_CDN.manualForm,
    VIDEO_CDN.scanPhoto,
    VIDEO_CDN.generateText,
    VIDEO_CDN.chatbot,
    VIDEO_CDN.exportImport,
    VIDEO_CDN.chart,
  ]
  return videos[index] || ''
}
