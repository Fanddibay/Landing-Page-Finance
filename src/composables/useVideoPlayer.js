import { ref, nextTick } from 'vue'

export function useVideoPlayer(videoSources, stepsCount = 6) {
  const videoRefs = ref([])
  const videoPlaying = ref({})
  const videoReady = ref({})
  const videoLoading = ref({})
  const videoShouldLoad = ref({})
  const videoStarted = ref({})

  // Initialize video refs array
  const initializeVideoRefs = () => {
    try {
      if (!Array.isArray(videoRefs.value)) {
        videoRefs.value = []
      }
      while (videoRefs.value.length < stepsCount) {
        videoRefs.value.push(null)
      }
    } catch (err) {
      console.error('Error initializing video refs:', err)
      if (!Array.isArray(videoRefs.value)) {
        videoRefs.value = []
      }
      while (videoRefs.value.length < stepsCount) {
        videoRefs.value.push(null)
      }
    }
  }

  // Helper functions
  const setVideoLoading = (index, value) => {
    videoLoading.value[index] = value
  }

  const setVideoReady = (index, value) => {
    videoReady.value[index] = value
  }

  const setVideoPlaying = (index, value) => {
    videoPlaying.value[index] = value
  }

  // Initialize video state
  const initializeVideoState = () => {
    for (let i = 0; i < stepsCount; i++) {
      setVideoPlaying(i, false)
      setVideoReady(i, false)
      videoLoading.value[i] = false // Direct assignment for better performance
      videoStarted.value[i] = false // Track if video element is mounted
      // Desktop: load all videos, Mobile: lazy load
      videoShouldLoad.value[i] = typeof window !== 'undefined' && window.innerWidth >= 1024 ? true : i === 0
    }
  }

  // Check if video should be loaded (mobile optimization)
  const shouldLoadVideo = (index) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      return true
    }
    return videoShouldLoad.value[index] === true
  }

  // Get video element from DOM
  const getVideoElement = (index, videoType = null) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024
    const type = videoType || (isMobile ? 'mobile' : 'desktop')
    let video = document.querySelector(`video[data-video-index="${index}"][data-video-type="${type}"]`)

    if (!video) {
      video = document.querySelector(`video[data-video-index="${index}"]`)
    }

    if (!video && videoRefs.value && videoRefs.value[index]) {
      video = videoRefs.value[index]
    }

    return video
  }

  // Video loaded handler - auto play directly when ready (no scroll trigger needed)
  const onVideoLoaded = (index) => {
    const video = getVideoElement(index)
    if (!video) return

    video.playbackRate = 1.25
    setVideoReady(index, true)

    // Ensure video is marked as started for auto-play
    if (!videoStarted.value[index]) {
      videoStarted.value[index] = true
    }

    // Auto-play directly when ready
    if (video.readyState >= 2) {
      // Stop other videos first
      document.querySelectorAll('video').forEach((v) => {
        if (v !== video && !v.paused) {
          v.pause()
          const vIndex = parseInt(v.getAttribute('data-video-index') || '-1')
          if (vIndex >= 0 && vIndex !== index) {
            setVideoPlaying(vIndex, false)
          }
        }
      })

      video.currentTime = 0
      video.play().then(() => {
        setVideoPlaying(index, true)
      }).catch(() => {
        // Auto-play blocked by browser policy
        setVideoPlaying(index, false)
      })
    } else {
      // Wait for video to be ready, then play
      const playWhenReady = () => {
        document.querySelectorAll('video').forEach((v) => {
          if (v !== video && !v.paused) {
            v.pause()
            const vIndex = parseInt(v.getAttribute('data-video-index') || '-1')
            if (vIndex >= 0 && vIndex !== index) {
              setVideoPlaying(vIndex, false)
            }
          }
        })

        video.currentTime = 0
        video.play().then(() => {
          setVideoPlaying(index, true)
        }).catch(() => {
          setVideoPlaying(index, false)
        })
      }

      if (video.readyState >= 3) {
        playWhenReady()
      } else {
        video.addEventListener('canplay', playWhenReady, { once: true })
      }
    }
  }

  // Start video - optimized for mobile performance
  const startVideo = (index) => {
    videoStarted.value[index] = true
    markVideoForLoading(index) // Ensure video is marked for loading

    // Use requestAnimationFrame for better mobile performance
    requestAnimationFrame(() => {
      nextTick(() => {
        const video = getVideoElement(index)

        if (video) {
          // Ensure source is loaded
          if (!video.src || video.src === '') {
            video.src = videoSources[index]
            video.load()
          }

          // Direct play attempt - video will handle buffering automatically
          playVideo(index)
        } else {
          // Fallback: try again briefly
          setTimeout(() => playVideo(index), 50)
        }
      })
    })
  }

  // Handle video progress - simplified (removed loading state tracking)
  const handleVideoProgress = (index, event) => {
    // No-op: Removed complex loading state tracking for better performance
    // Browser handles buffering automatically
  }

  // Play video - simplified for faster execution
  const playVideo = (index) => {
    const video = getVideoElement(index)
    if (!video) return

    // Stop all other videos
    document.querySelectorAll('video').forEach((v) => {
      if (v !== video && !v.paused) {
        v.pause()
        const vIndex = parseInt(v.getAttribute('data-video-index') || '-1')
        if (vIndex >= 0) {
          setVideoPlaying(vIndex, false)
        }
      }
    })

    // Ensure video source is loaded
    if (!video.src || video.src === '') {
      video.src = videoSources[index]
      video.load()
    }

    // Direct play - browser handles buffering
    if (video.readyState >= 1) {
      // Reset to beginning
      video.currentTime = 0
      
      // Play immediately
      video.play().then(() => {
        setVideoPlaying(index, true)
      }).catch(() => {
        // Auto-play blocked, wait for canplay
        const onCanPlay = () => {
          video.play().then(() => {
            setVideoPlaying(index, true)
          }).catch(() => {
            setVideoPlaying(index, false)
          })
        }
        video.addEventListener('canplay', onCanPlay, { once: true })
      })
    } else {
      // Wait for video metadata, then play
      const onCanPlay = () => {
        video.currentTime = 0
        video.play().then(() => {
          setVideoPlaying(index, true)
        }).catch(() => {
          setVideoPlaying(index, false)
        })
      }
      video.addEventListener('canplay', onCanPlay, { once: true })
      if (video.readyState === 0) {
        video.load()
      }
    }
  }

  // Pause video
  const pauseVideo = (index) => {
    const video = getVideoElement(index)
    if (!video) return

    video.pause()
    setVideoPlaying(index, false)
  }

  // Set video ref callback
  const setVideoRef = (el, index, videoType) => {
    if (el) {
      try {
        initializeVideoRefs()
        if (Array.isArray(videoRefs.value) && index >= 0 && index < videoRefs.value.length) {
          videoRefs.value[index] = el
        }
        el.setAttribute('data-video-index', index)
        el.setAttribute('data-video-type', videoType)
      } catch (err) {
        console.error('Error setting video ref:', err)
      }
    }
  }

  // Mark video for loading (used by lazy loading) - also auto-play when loaded
  const markVideoForLoading = (index) => {
    if (!videoShouldLoad.value[index]) {
      videoShouldLoad.value[index] = true
      // Don't set videoStarted here - let it be set when video element is actually needed
      // This prevents premature video element creation on mobile
    }
  }

  // Auto play visible videos - ensures video is loaded and plays automatically
  const autoPlayVisibleVideo = (index) => {
    // Mark video as started first
    if (!videoStarted.value[index]) {
      videoStarted.value[index] = true
    }

    // Mark for loading to ensure source is set
    markVideoForLoading(index)

    // Use startVideo which handles loading and playing
    // This ensures video element is properly initialized before playing
    nextTick(() => {
      const video = getVideoElement(index)
      if (!video) {
        // If video element doesn't exist yet, try startVideo which will create it
        startVideo(index)
        return
      }

      // Ensure source is loaded
      if (!video.src || video.src === '') {
        video.src = videoSources[index]
        video.load()
      }

      // Stop all other videos first
      document.querySelectorAll('video').forEach((v) => {
        if (v !== video && !v.paused) {
          v.pause()
          const vIndex = parseInt(v.getAttribute('data-video-index') || '-1')
          if (vIndex >= 0 && vIndex !== index) {
            setVideoPlaying(vIndex, false)
          }
        }
      })

      // Play immediately if ready, otherwise wait
      if (video.readyState >= 2) {
        video.currentTime = 0
        video.play().then(() => {
          setVideoPlaying(index, true)
        }).catch(() => {
          setVideoPlaying(index, false)
        })
      } else if (video.readyState >= 1) {
        // Metadata loaded, wait for canplay
        const onCanPlay = () => {
          video.currentTime = 0
          video.play().then(() => {
            setVideoPlaying(index, true)
          }).catch(() => {
            setVideoPlaying(index, false)
          })
        }
        video.addEventListener('canplay', onCanPlay, { once: true })
      } else {
        // Not loaded yet, wait for loadedmetadata then canplay
        const onLoaded = () => {
          const onCanPlay = () => {
            video.currentTime = 0
            video.play().then(() => {
              setVideoPlaying(index, true)
            }).catch(() => {
              setVideoPlaying(index, false)
            })
          }
          video.addEventListener('canplay', onCanPlay, { once: true })
        }
        video.addEventListener('loadedmetadata', onLoaded, { once: true })
      }
    })
  }

  return {
    // State
    videoRefs,
    videoPlaying,
    videoReady,
    videoLoading,
    videoStarted,
    videoShouldLoad,

    // Methods
    initializeVideoRefs,
    initializeVideoState,
    shouldLoadVideo,
    getVideoElement,
    onVideoLoaded,
    startVideo,
    handleVideoProgress,
    playVideo,
    pauseVideo,
    setVideoRef,
    markVideoForLoading,
    setVideoLoading,
    setVideoReady,
    setVideoPlaying,
    autoPlayVisibleVideo,
  }
}
