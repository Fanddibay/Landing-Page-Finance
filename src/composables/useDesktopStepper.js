import { ref, onMounted, onUnmounted } from 'vue'

export function useDesktopStepper(activeStep, stepRefs) {
  const stepperRef = ref(null)
  const showStepper = ref(true)
  let observer = null
  let stepperObserver = null
  let scrollHandler = null

  // Scroll to specific step
  const scrollToStep = (index) => {
    activeStep.value = index
    if (stepRefs.value[index]) {
      stepRefs.value[index].scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // Setup intersection observers with auto-play callback
  const setupObservers = (markVideoForLoading, autoPlayVisibleVideo) => {
    const stepElements = stepRefs.value.filter(el => el)
    if (stepElements.length === 0) return

    // Observer for step elements
    observer = new IntersectionObserver((entries) => {
      let maxRatio = 0
      let mostVisibleIndex = activeStep.value

      entries.forEach((entry) => {
        const index = stepElements.indexOf(entry.target)
        if (index !== -1 && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio
          mostVisibleIndex = index

          const isFullyVisible = entry.intersectionRatio >= 0.9 // 90% or more visible

          // Lazy load video when step becomes partially visible
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const video = entry.target.querySelector('video')
            if (video) {
              // Mark for loading if not already loaded
              if (markVideoForLoading) {
                markVideoForLoading(index)
              }
              
              // Load if not loaded
              if (video.readyState === 0) {
                video.load()
              }
            }
          }

          // Only auto-play when content is fully visible (90%+)
          if (entry.isIntersecting && isFullyVisible && autoPlayVisibleVideo) {
            const video = entry.target.querySelector('video')
            if (video) {
              setTimeout(() => autoPlayVisibleVideo(index), 200)
            }
          }
        }
      })

      if (mostVisibleIndex !== activeStep.value && maxRatio > 0.1) {
        activeStep.value = mostVisibleIndex
      }
    }, {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 0.9, 1.0], // Multiple thresholds to detect full visibility
    })

    stepElements.forEach((stepEl) => {
      observer.observe(stepEl)
    })

    // Stepper visibility observer
    if (stepperRef.value) {
      let lastScrollY = window.scrollY
      let lastIntersecting = true

      stepperObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const currentScrollY = window.scrollY
            const scrollingDown = currentScrollY > lastScrollY
            const scrollingUp = currentScrollY < lastScrollY

            if (entry.isIntersecting) {
              showStepper.value = true
              lastIntersecting = true
            } else {
              if (scrollingDown && !entry.isIntersecting) {
                showStepper.value = false
              } else if (scrollingUp) {
                showStepper.value = true
              }
              lastIntersecting = entry.isIntersecting
            }

            lastScrollY = currentScrollY
          })
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
        }
      )
      stepperObserver.observe(stepperRef.value)

      scrollHandler = () => {
        lastScrollY = window.scrollY
      }
      window.addEventListener('scroll', scrollHandler, { passive: true })
    }
  }

  // Cleanup
  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
    if (stepperObserver) {
      stepperObserver.disconnect()
    }
    if (scrollHandler) {
      window.removeEventListener('scroll', scrollHandler)
    }
  })

  return {
    stepperRef,
    showStepper,
    scrollToStep,
    setupObservers,
  }
}
