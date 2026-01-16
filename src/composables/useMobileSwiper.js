import { ref, nextTick, onMounted, onUnmounted } from 'vue'

export function useMobileSwiper(activeStep, stepsLength = 6) {
  const swiperContainer = ref(null)
  const swiperWidth = ref(0)
  const slideRefs = ref([])
  const isScrolling = ref(false)
  let scrollTimeout = null
  let mobileObserver = null
  let mobileVideoObserver = null

  // Update swiper width based on viewport
  const updateSwiperWidth = () => {
    if (swiperContainer.value) {
      swiperWidth.value = swiperContainer.value.clientWidth
    }
  }

  // Go to specific slide
  const goToSlide = (index) => {
    if (!swiperContainer.value) return
    const container = swiperContainer.value
    const containerWidth = container.clientWidth
    const gap = 24 // gap-6 = 1.5rem = 24px
    const slideWidth = containerWidth
    const totalSlideWidth = slideWidth + gap
    const scrollPosition = index * totalSlideWidth

    activeStep.value = index
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    })
  }

  // Handle swiper scroll
  const onSwiperScroll = () => {
    if (!swiperContainer.value) return

    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      const container = swiperContainer.value
      const scrollLeft = container.scrollLeft
      const containerWidth = container.clientWidth
      const gap = 24
      const slideWidth = containerWidth
      const totalSlideWidth = slideWidth + gap

      let newIndex = Math.round(scrollLeft / totalSlideWidth)
      newIndex = Math.max(0, Math.min(newIndex, stepsLength - 1))

      if (newIndex !== activeStep.value) {
        activeStep.value = newIndex
      }
    }, 100)
  }

  // Touch events
  const onTouchStart = () => {
    isScrolling.value = true
  }

  const onTouchEnd = () => {
    setTimeout(() => {
      isScrolling.value = false
      if (swiperContainer.value) {
        onSwiperScroll()
      }
    }, 200)
  }

  // Setup intersection observers for lazy loading only
  const setupObservers = (markVideoForLoading, loadVideoSource) => {
    if (!swiperContainer.value) return

    const slides = slideRefs.value.filter(el => el)
    if (slides.length === 0) return

    // Clean up existing observers
    if (mobileObserver) {
      mobileObserver.disconnect()
    }
    if (mobileVideoObserver) {
      mobileVideoObserver.disconnect()
    }

    // Observer for slide visibility (active step detection)
    mobileObserver = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0
        let mostVisibleIndex = activeStep.value

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            const index = slides.indexOf(entry.target)
            if (index !== -1) {
              mostVisibleIndex = index
            }
          }
        })

        if (mostVisibleIndex !== activeStep.value && maxRatio > 0.2) {
          activeStep.value = mostVisibleIndex
        }
      },
      {
        root: swiperContainer.value,
        rootMargin: '-10% 0px -10% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    )

    // Observer for video lazy loading only (no auto-play trigger)
    if (markVideoForLoading) {
      mobileVideoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const slide = entry.target.closest('.swiper-slide')
            if (!slide) return

            const index = slides.indexOf(slide)
            if (index === -1) return

            if (entry.isIntersecting) {
              // Mark video for loading when slide becomes visible (lazy loading)
              markVideoForLoading(index)

              // Load video source if needed
              const video = slide.querySelector('video[data-video-type="mobile"]')
              if (video && !video.src && loadVideoSource) {
                loadVideoSource(video, index)
              }
            }
          })
        },
        {
          root: swiperContainer.value,
          rootMargin: '0px',
          threshold: 0.1, // Simple threshold for lazy loading
        }
      )
    }

    slides.forEach((slide) => {
      mobileObserver.observe(slide)
      if (mobileVideoObserver) {
        mobileVideoObserver.observe(slide)
      }
    })
  }

  // Initialize
  onMounted(() => {
    nextTick(() => {
      updateSwiperWidth()
      window.addEventListener('resize', updateSwiperWidth)
    })
  })

  onUnmounted(() => {
    if (mobileObserver) {
      mobileObserver.disconnect()
    }
    if (mobileVideoObserver) {
      mobileVideoObserver.disconnect()
    }
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
    window.removeEventListener('resize', updateSwiperWidth)
  })

  return {
    swiperContainer,
    swiperWidth,
    slideRefs,
    isScrolling,
    updateSwiperWidth,
    goToSlide,
    onSwiperScroll,
    onTouchStart,
    onTouchEnd,
    setupObservers,
  }
}
