<template>
  <section id="features" class="py-16 md:py-24 ">
    <div class="container mx-auto px-0 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div ref="sectionRef" :class="['w-full max-w-[1035px] mx-auto px-4 sm:px-6']">
        <!-- Mobile/Tablet: Swiper Layout with Horizontal Stepper -->
        <div class="lg:hidden">
          <!-- Header -->
          <div class="mb-8">
            <h2 class="text-3xl font-semibold text-gray-900 leading-tight mb-4">
              {{ t.features.title }}
            </h2>
            <p class="text-lg text-gray-600 leading-relaxed mb-6">
              {{ t.features.subtitle }}
            </p>

            <!-- Horizontal Stepper -->
            <div class="flex gap-2 md:gap-3 overflow-x-auto pb-4 scrollbar-hide">
              <button v-for="(step, index) in t.features.steps" :key="index" @click="goToSlide(index)"
                class="flex-shrink-0 flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-semibold text-xs md:text-sm transition-all duration-200 whitespace-nowrap"
                :class="activeStep === index
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-400 hover:bg-gray-300 hover:text-gray-500'">
                <!-- Step Indicator -->
                <div
                  class="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0"
                  :class="index < activeStep
                    ? 'bg-white/20'
                    : index === activeStep
                      ? 'bg-white/30'
                      : 'bg-gray-300'">
                  <!-- Checkmark for completed steps -->
                  <svg v-if="index < activeStep" class="w-3 h-3 text-white" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                  <!-- Active step dot -->
                  <div v-else-if="index === activeStep" class="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <span>{{ step.title }}</span>
              </button>
            </div>
          </div>

          <!-- Swiper Container -->
          <div class="relative">
            <div ref="swiperContainer"
              class="swiper-container overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
              @scroll="onSwiperScroll" @touchstart="onTouchStart" @touchend="onTouchEnd">
              <div class="flex gap-6" style="width: fit-content;">
                <div v-for="(step, index) in t.features.steps" :key="index"
                  :ref="el => { if (el) slideRefs[index] = el }" class="swiper-slide flex-shrink-0 snap-start"
                  :style="{ width: swiperWidth > 0 ? `${swiperWidth}px` : '100%' }">
                  <div class="rounded-2xl flex flex-col items-center gap-6 p-6">
                    <!-- Phone Mockup with Video -->
                    <div class="relative mb-4 flex justify-center">
                      <div class="w-48 md:w-56">
                        <div class="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                          <div class="bg-white rounded-[2rem] overflow-hidden relative">
                            <!-- Video Container -->
                            <div class="relative w-full bg-black aspect-[9/19.5]">
                              <video :ref="el => {
                                if (el) {
                                  videoRefs[index] = el
                                  el.setAttribute('data-video-index', index)
                                  el.setAttribute('data-video-type', 'mobile')
                                }
                              }" :src="videoSources[index]" :data-video-index="index" data-video-type="mobile"
                                class="w-full h-full object-cover" muted loop playsinline preload="metadata"
                                @loadedmetadata="onVideoLoaded(index)" @play="videoPlaying[index] = true"
                                @pause="videoPlaying[index] = false" @ended="videoPlaying[index] = false"
                                @click.stop="playVideo(index)"></video>
                              <!-- Play Button Overlay -->
                              <button v-if="!videoPlaying[index]" @click.stop="playVideo(index)"
                                class="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-200 group z-10">
                                <div
                                  class="w-20 h-20 rounded-full bg-primary-500/90 hover:bg-primary-600 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-200 backdrop-blur-sm">
                                  <svg class="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </button>
                              <!-- Pause Button (shown when playing) -->
                              <button v-else @click.stop="pauseVideo(index)"
                                class="absolute inset-0 flex items-center justify-center bg-transparent hover:bg-black/10 transition-all duration-200 group opacity-0 hover:opacity-100 z-10">
                                <div
                                  class="w-16 h-16 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-200">
                                  <svg class="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                  </svg>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Content -->
                    <div class="text-center">
                      <h3 class="text-2xl font-semibold text-gray-900 mb-3">
                        {{ step.title }}
                      </h3>
                      <p class="text-base md:text-lg text-gray-600 leading-relaxed">
                        {{ step.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Progress Bar Indicator -->
            <div class="mt-6 flex justify-center gap-2">
              <div v-for="(step, index) in t.features.steps" :key="index"
                class="h-1.5 rounded-full transition-all duration-300" :class="index === activeStep
                  ? 'bg-primary-600 w-8'
                  : index < activeStep
                    ? 'bg-primary-400 w-6'
                    : 'bg-gray-300 w-2'"></div>
            </div>
          </div>
        </div>

        <!-- Desktop: Two Column Layout -->
        <div class="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <!-- Right Column: Feature Cards with Video Phone Mockups -->
          <div class="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div v-for="(step, index) in t.features.steps" :key="index" :ref="el => { if (el) stepRefs[index] = el }"
              class="rounded-2xl flex flex-col items-center gap-8 p-6 md:p-8 transition-all duration-300">
              <!-- Phone Mockup with Video -->
              <div class="relative mb-6 flex justify-center">
                <div class="w-48 md:w-56">
                  <div class="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                    <div class="bg-white rounded-[2rem] overflow-hidden relative">
                      <!-- Video Container -->
                      <div class="relative w-full bg-black aspect-[9/19.5]">
                        <video :ref="el => {
                          if (el) {
                            videoRefs[index] = el
                            el.setAttribute('data-video-index', index)
                            el.setAttribute('data-video-type', 'desktop')
                          }
                        }" :src="videoSources[index]" :data-video-index="index" data-video-type="desktop"
                          class="w-full h-full object-cover" muted loop playsinline preload="metadata"
                          @loadedmetadata="onVideoLoaded(index)" @play="videoPlaying[index] = true"
                          @pause="videoPlaying[index] = false" @ended="videoPlaying[index] = false"
                          @click.stop="playVideo(index)"></video>
                        <!-- Play Button Overlay -->
                        <button v-if="!videoPlaying[index]" @click="playVideo(index)"
                          class="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-200 group">
                          <div
                            class="w-20 h-20 rounded-full bg-primary-500/90 hover:bg-primary-600 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-200 backdrop-blur-sm">
                            <svg class="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </button>
                        <!-- Pause Button (shown when playing) -->
                        <button v-else @click="pauseVideo(index)"
                          class="absolute inset-0 flex items-center justify-center bg-transparent hover:bg-black/10 transition-all duration-200 group opacity-0 hover:opacity-100">
                          <div
                            class="w-16 h-16 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-200">
                            <svg class="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Content -->
              <div class="text-center">
                <h3 class="text-2xl font-semibold text-gray-900 mb-3">
                  {{ step.title }}
                </h3>
                <p class="text-base md:text-lg text-gray-600 leading-relaxed">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Left Column: Title & Description + Stepper (Sticky) -->
          <div class="lg:sticky lg:top-24 space-y-6">
            <div>
              <h2 class="text-3xl font-semibold text-gray-900 leading-tight mb-4">
                {{ t.features.title }}
              </h2>
              <p class="text-lg text-gray-600 leading-relaxed">
                {{ t.features.subtitle }}
              </p>
            </div>

            <!-- Vertical Stepper (Sticky with hide/show logic) -->
            <div ref="stepperRef" class="relative pl-2 transition-opacity duration-300"
              :class="showStepper ? 'opacity-100' : 'opacity-0 pointer-events-none'">
              <div class="flex flex-col gap-0">
                <div v-for="(step, index) in t.features.steps" :key="index" @click="scrollToStep(index)"
                  class="relative flex items-center gap-4 cursor-pointer group transition-all duration-200 py-2">
                  <!-- Connecting Line (vertical line between steps) -->
                  <div v-if="index < t.features.steps.length - 1"
                    class="absolute left-4 top-10 h-12 transition-all duration-200">
                    <!-- Solid line for completed steps -->
                    <div v-if="index < activeStep" class="w-0.5 h-full bg-primary-600"></div>
                    <!-- Dashed line for pending steps -->
                    <div v-else class="w-0.5 h-full"
                      style="background: repeating-linear-gradient(to bottom, rgb(209, 213, 219) 0px, rgb(209, 213, 219) 4px, transparent 4px, transparent 8px);">
                    </div>
                  </div>

                  <!-- Step Indicator -->
                  <div class="relative flex items-center justify-center z-10">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                      :class="index < activeStep
                        ? 'bg-primary-600'
                        : index === activeStep
                          ? 'bg-primary-600'
                          : 'bg-gray-300'">
                      <!-- Checkmark for completed steps -->
                      <svg v-if="index < activeStep" class="w-5 h-5 text-white" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                      <!-- Active step (solid circle with white dot) -->
                      <div v-else-if="index === activeStep" class="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                  </div>

                  <!-- Step Text -->
                  <div class="flex-1 transition-all duration-200" :class="index < activeStep
                    ? 'text-primary-600 font-medium'
                    : index === activeStep
                      ? 'text-primary-600 font-semibold'
                      : 'text-gray-400'">
                    {{ step.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useScrollAnimation } from '../composables/useScrollAnimation'

// Video imports
import manualFormVideo from './assets/video/manualForm.MP4'
import scanPhotoVideo from './assets/video/scanPhoto.MP4'
import generateTextVideo from './assets/video/generateText.MP4'
import chatbotVideo from './assets/video/chatbot.MP4'
import exportImportVideo from './assets/video/exportImport.MP4'
import chartVideo from './assets/video/chart.MP4'

const { t } = useI18n()
const { elementRef: sectionRef, isVisible } = useScrollAnimation()

// Video sources array
const videoSources = [
  manualFormVideo,
  scanPhotoVideo,
  generateTextVideo,
  chatbotVideo,
  exportImportVideo,
  chartVideo,
]

// Reactive state
const activeStep = ref(0)
const videoRefs = ref([])
const videoPlaying = ref({})
const stepRefs = ref([])
const stepperRef = ref(null)
const showStepper = ref(true)
const swiperContainer = ref(null)
const swiperWidth = ref(0)
const slideRefs = ref([]) // For mobile swiper slides
let observer = null
let stepperObserver = null
let scrollHandler = null
let isScrolling = false
let scrollTimeout = null
let mobileObserver = null // IntersectionObserver for mobile slides

// Calculate swiper width based on viewport
const updateSwiperWidth = () => {
  if (swiperContainer.value) {
    // Get container width (full width of the container)
    swiperWidth.value = swiperContainer.value.clientWidth
  }
}

// Video loaded handler
const onVideoLoaded = (index) => {
  // Find video in DOM
  const isMobile = window.innerWidth < 1024
  const videoType = isMobile ? 'mobile' : 'desktop'
  let video = document.querySelector(`video[data-video-index="${index}"][data-video-type="${videoType}"]`)

  if (!video) {
    video = document.querySelector(`video[data-video-index="${index}"]`)
  }

  if (!video && videoRefs.value[index]) {
    video = videoRefs.value[index]
  }

  if (video) {
    video.playbackRate = 1.25
    // Initialize videoPlaying state
    if (videoPlaying.value[index] === undefined) {
      videoPlaying.value[index] = false
    }
  }
}

// Play video
const playVideo = (index) => {
  console.log(`Attempting to play video ${index}`)

  // Always find video in DOM first (most reliable)
  const isMobile = window.innerWidth < 1024
  const videoType = isMobile ? 'mobile' : 'desktop'
  let video = document.querySelector(`video[data-video-index="${index}"][data-video-type="${videoType}"]`)

  // Fallback: find any video with this index
  if (!video) {
    video = document.querySelector(`video[data-video-index="${index}"]`)
  }

  // Also check refs as last resort
  if (!video && videoRefs.value[index]) {
    video = videoRefs.value[index]
  }

  if (!video) {
    console.error(`Video at index ${index} not found in DOM or refs`)
    console.log('Available videos:', document.querySelectorAll('video'))
    return
  }

  console.log(`Found video for index ${index}:`, video)

  // Stop all other videos
  document.querySelectorAll('video').forEach((v) => {
    if (v !== video && !v.paused) {
      v.pause()
      const vIndex = parseInt(v.getAttribute('data-video-index') || '-1')
      if (vIndex >= 0) {
        videoPlaying.value[vIndex] = false
      }
    }
  })

  // Initialize videoPlaying state
  if (videoPlaying.value[index] === undefined) {
    videoPlaying.value[index] = false
  }

  // Play the video
  try {
    const playPromise = video.play()

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log(`Video ${index} started playing`)
          videoPlaying.value[index] = true
        })
        .catch((err) => {
          console.error(`Error playing video ${index}:`, err)
          videoPlaying.value[index] = false
        })
    } else {
      // Fallback for older browsers
      videoPlaying.value[index] = true
    }
  } catch (err) {
    console.error(`Exception playing video ${index}:`, err)
    videoPlaying.value[index] = false
  }
}

// Pause video
const pauseVideo = (index) => {
  // Find video in DOM
  const isMobile = window.innerWidth < 1024
  const videoType = isMobile ? 'mobile' : 'desktop'
  let video = document.querySelector(`video[data-video-index="${index}"][data-video-type="${videoType}"]`)

  if (!video) {
    video = document.querySelector(`video[data-video-index="${index}"]`)
  }

  if (!video && videoRefs.value[index]) {
    video = videoRefs.value[index]
  }

  if (!video) return

  video.pause()
  videoPlaying.value[index] = false
}

// Scroll to step (desktop)
const scrollToStep = (index) => {
  activeStep.value = index
  if (stepRefs.value[index]) {
    stepRefs.value[index].scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

// Go to slide (mobile)
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

// Handle swiper scroll (mobile) - fallback method
const onSwiperScroll = () => {
  if (!swiperContainer.value) return

  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    const container = swiperContainer.value
    const scrollLeft = container.scrollLeft
    const containerWidth = container.clientWidth
    const gap = 24 // gap-6 = 1.5rem = 24px

    // Calculate which slide is currently visible
    // Each slide width = containerWidth, with gap between them
    const slideWidth = containerWidth
    const totalSlideWidth = slideWidth + gap

    // Find the closest slide index
    // Account for scroll snap behavior - use scrollLeft divided by totalSlideWidth
    let newIndex = Math.round(scrollLeft / totalSlideWidth)

    // Ensure index is within bounds
    newIndex = Math.max(0, Math.min(newIndex, t.features.steps.length - 1))

    if (newIndex !== activeStep.value) {
      activeStep.value = newIndex
    }
  }, 100)
}

// Touch events for better mobile UX
const onTouchStart = () => {
  isScrolling = true
}

const onTouchEnd = () => {
  setTimeout(() => {
    isScrolling = false
    // Force update after touch end
    if (swiperContainer.value) {
      onSwiperScroll()
    }
  }, 200)
}

// Intersection Observer setup for steps (desktop)
onMounted(() => {
  // Update swiper width for mobile
  nextTick(() => {
    updateSwiperWidth()
    // Recalculate on resize
    window.addEventListener('resize', updateSwiperWidth)

    // Setup IntersectionObserver for mobile slides
    setTimeout(() => {
      const slides = slideRefs.value.filter(el => el)
      if (slides.length > 0 && swiperContainer.value) {
        // Clean up existing observer
        if (mobileObserver) {
          mobileObserver.disconnect()
        }

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

        slides.forEach((slide) => {
          mobileObserver.observe(slide)
        })
      }
    }, 200)
  })

  nextTick(() => {
    setTimeout(() => {
      // Desktop: Setup IntersectionObserver for step elements
      const stepElements = stepRefs.value.filter(el => el)
      if (stepElements.length > 0) {
        const options = {
          root: null,
          rootMargin: '-30% 0px -30% 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }

        observer = new IntersectionObserver((entries) => {
          let maxRatio = 0
          let mostVisibleIndex = activeStep.value

          entries.forEach((entry) => {
            const index = stepElements.indexOf(entry.target)
            if (index !== -1 && entry.intersectionRatio > maxRatio) {
              maxRatio = entry.intersectionRatio
              mostVisibleIndex = index
            }
          })

          if (mostVisibleIndex !== activeStep.value && maxRatio > 0.1) {
            activeStep.value = mostVisibleIndex
          }
        }, options)

        stepElements.forEach((stepEl) => {
          observer.observe(stepEl)
        })
      }

      // Stepper visibility observer (desktop)
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
    }, 100)
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  if (stepperObserver) {
    stepperObserver.disconnect()
  }
  if (mobileObserver) {
    mobileObserver.disconnect()
  }
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
  window.removeEventListener('resize', updateSwiperWidth)
})
</script>

<style scoped>
/* Scrollbar hide */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Swiper container */
.swiper-container {
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
}

.swiper-slide {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* Smooth scroll behavior */
.swiper-container {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  .swiper-container {
    scroll-behavior: auto;
  }
}
</style>
