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
      setVideoLoading(i, false)
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

  // Video loaded handler - auto play when ready
  const onVideoLoaded = (index) => {
    const video = getVideoElement(index)

    if (!video) return

    video.playbackRate = 1.25

    const attemptAutoPlay = () => {
      if (video.readyState >= 2) {
        // Show first frame and auto play
        video.currentTime = 0.1
        setVideoReady(index, true)
        setVideoLoading(index, false)

        // Auto play when ready
        const playWhenReady = () => {
          if (video.readyState >= 3) {
            video.play().then(() => {
              setVideoPlaying(index, true)
              setVideoLoading(index, false)
            }).catch(() => {
              // Auto-play blocked, keep paused
              video.pause()
              setVideoPlaying(index, false)
              setVideoLoading(index, false)
            })
          }
        }

        if (video.readyState >= 3) {
          playWhenReady()
        } else {
          video.addEventListener('canplaythrough', playWhenReady, { once: true })
        }
      } else {
        video.addEventListener('canplay', () => {
          video.currentTime = 0.1
          setVideoReady(index, true)
          setVideoLoading(index, false)

          // Attempt auto play
          video.play().then(() => {
            setVideoPlaying(index, true)
            setVideoLoading(index, false)
          }).catch(() => {
            video.pause()
            setVideoPlaying(index, false)
            setVideoLoading(index, false)
          })
        }, { once: true })
      }
    }

    if (video.readyState >= 1) {
      attemptAutoPlay()
    } else {
      video.addEventListener('loadeddata', attemptAutoPlay, { once: true })
    }
  }

  // Start video - load and prepare video element
  const startVideo = (index) => {
    videoStarted.value[index] = true
    setVideoLoading(index, true)

    nextTick(() => {
      const video = getVideoElement(index)

      if (video) {
        // Ensure source is loaded
        if (!video.src || video.src === '') {
          video.src = videoSources[index]
          video.load()
        }

        // If already ready, trigger play
        if (video.readyState >= 3) {
          playVideo(index)
        } else if (video.readyState >= 2) {
          // Can play current frame
          playVideo(index)
        } else {
          // Wait for video to be ready
          const onCanPlay = () => {
            playVideo(index)
          }
          video.addEventListener('canplay', onCanPlay, { once: true })
          if (video.readyState === 0) {
            video.load()
          }
        }
      } else {
        // Fallback: try again after delay
        setTimeout(() => {
          if (shouldLoadVideo(index)) {
            playVideo(index)
          } else {
            markVideoForLoading(index)
          }
        }, 100)
      }
    })
  }

  // Handle video progress
  const handleVideoProgress = (index, event) => {
    const video = event.target
    if (video && !video.paused && video.readyState >= 3) {
      setVideoLoading(index, false)
      return
    }
    if (video && video.buffered.length > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1)
      const duration = video.duration
      if (duration > 0) {
        const bufferedPercent = (bufferedEnd / duration) * 100
        if (bufferedPercent < 90 && video.paused) {
          setVideoLoading(index, true)
        } else {
          setVideoLoading(index, false)
        }
      }
    }
  }

  // Play video
  const playVideo = (index) => {
    setVideoLoading(index, true)

    const video = getVideoElement(index)
    if (!video) {
      setVideoLoading(index, false)
      return
    }

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

    setVideoPlaying(index, false)

    // Ensure video source is loaded
    if (!video.src || video.src === '') {
      video.src = videoSources[index]
      video.load()
    }

    // Ensure video is ready before playing
    if (!videoReady.value[index] || videoReady.value[index] === undefined) {
      const onCanPlay = () => {
        video.currentTime = 0
        video.play().then(() => {
          setVideoPlaying(index, true)
          setVideoLoading(index, false)
        }).catch(() => {
          setVideoPlaying(index, false)
          setVideoLoading(index, false)
        })
        video.removeEventListener('canplay', onCanPlay)
      }

      if (video.readyState >= 2) {
        video.currentTime = 0
        video.play().then(() => {
          setVideoPlaying(index, true)
          setVideoLoading(index, false)
        }).catch(() => {
          setVideoPlaying(index, false)
          setVideoLoading(index, false)
        })
      } else {
        video.addEventListener('canplay', onCanPlay, { once: true })
        if (video.readyState === 0) {
          video.load()
        }
      }
      return
    }

    // Reset to beginning for smooth start
    if (video.readyState >= 2) {
      video.currentTime = 0
    }

    // Play the video
    try {
      const playPromise = video.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoPlaying(index, true)
            setVideoLoading(index, false)
          })
          .catch(() => {
            setVideoPlaying(index, false)
            setVideoLoading(index, false)
          })
      } else {
        setVideoPlaying(index, true)
        setVideoLoading(index, false)
      }
    } catch (err) {
      setVideoPlaying(index, false)
      setVideoLoading(index, false)
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

  // Mark video for loading (used by lazy loading)
  const markVideoForLoading = (index) => {
    if (!videoShouldLoad.value[index]) {
      videoShouldLoad.value[index] = true
      
      // If video element exists, load it
      nextTick(() => {
        const video = getVideoElement(index)
        if (video && (!video.src || video.src === '')) {
          video.src = videoSources[index]
          video.load()
        }
      })
    }
  }

  // Auto play visible videos (called when video becomes fully visible)
  const autoPlayVisibleVideo = (index) => {
    const video = getVideoElement(index)
    if (!video) return

    // Don't play if already playing
    if (!video.paused) {
      setVideoPlaying(index, true)
      return
    }

    // Ensure video is started (mounted)
    if (!videoStarted.value[index]) {
      videoStarted.value[index] = true
    }

    // Only auto-play if video is ready
    if (videoReady.value[index] || video.readyState >= 2) {
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

      // Play the video
      video.play().then(() => {
        setVideoPlaying(index, true)
        setVideoLoading(index, false)
      }).catch(() => {
        // Auto-play blocked by browser policy (user interaction required)
        setVideoPlaying(index, false)
        setVideoLoading(index, false)
      })
    } else {
      // Wait for video to be ready, then play
      const onCanPlay = () => {
        document.querySelectorAll('video').forEach((v) => {
          if (v !== video && !v.paused) {
            v.pause()
            const vIndex = parseInt(v.getAttribute('data-video-index') || '-1')
            if (vIndex >= 0 && vIndex !== index) {
              setVideoPlaying(vIndex, false)
            }
          }
        })

        video.play().then(() => {
          setVideoPlaying(index, true)
          setVideoLoading(index, false)
        }).catch(() => {
          setVideoPlaying(index, false)
          setVideoLoading(index, false)
        })
        video.removeEventListener('canplay', onCanPlay)
      }

      video.addEventListener('canplay', onCanPlay, { once: true })
    }
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
