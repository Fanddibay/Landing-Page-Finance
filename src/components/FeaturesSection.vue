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
                <div
                  class="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0"
                  :class="index < activeStep
                    ? 'bg-white/20'
                    : index === activeStep
                      ? 'bg-white/30'
                      : 'bg-gray-300'">
                  <svg v-if="index < activeStep" class="w-3 h-3 text-white" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
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
                            <!-- Video Container - Lazy load for mobile performance -->
                            <FeatureVideoPlayer :index="index" video-type="mobile"
                              :video-src="videoStarted[index] && shouldLoadVideo(index) ? videoSources[index] : undefined"
                              :placeholder="heroPlaceholder" :video-started="videoStarted[index]"
                              :video-playing="videoPlaying[index]" :video-ready="videoReady[index]"
                              :video-loading="videoLoading[index]"
                              :set-video-ref="(el, idx, type) => setVideoRef(el, idx, type)" :start-video="startVideo"
                              :play-video="playVideo" :pause-video="pauseVideo" :on-video-loaded="onVideoLoaded"
                              :set-video-ready="setVideoReady" :set-video-playing="setVideoPlaying" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Content -->
                    <div class="text-center">
                      <h3 class="text-2xl font-semibold text-gray-900 mb-3">{{ step.title }}</h3>
                      <p class="text-base md:text-lg text-gray-600 leading-relaxed">{{ step.description }}</p>
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
                      <!-- Video Container - Desktop: auto-load and auto-play -->
                      <FeatureVideoPlayer :index="index" video-type="desktop" :video-src="videoSources[index]"
                        :placeholder="heroPlaceholder" :video-started="videoStarted[index] || true"
                        :video-playing="videoPlaying[index]" :video-ready="videoReady[index]"
                        :video-loading="videoLoading[index]"
                        :set-video-ref="(el, idx, type) => setVideoRef(el, idx, type)" :start-video="startVideo"
                        :play-video="playVideo" :pause-video="pauseVideo" :on-video-loaded="onVideoLoaded"
                        :set-video-ready="setVideoReady" :set-video-playing="setVideoPlaying" />
                    </div>
                  </div>
                </div>
              </div>
              <!-- Content -->
              <div class="text-center">
                <h3 class="text-2xl font-semibold text-gray-900 mb-3">{{ step.title }}</h3>
                <p class="text-base md:text-lg text-gray-600 leading-relaxed">{{ step.description }}</p>
              </div>
            </div>
          </div>

          <!-- Left Column: Title & Description + Stepper (Sticky) -->
          <div class="lg:sticky lg:top-24 space-y-6">
            <div>
              <h2 class="text-3xl font-semibold text-gray-900 leading-tight mb-4">{{ t.features.title }}</h2>
              <p class="text-lg text-gray-600 leading-relaxed">{{ t.features.subtitle }}</p>
            </div>

            <!-- Vertical Stepper -->
            <div ref="stepperRef" class="relative pl-2 transition-opacity duration-300"
              :class="showStepper ? 'opacity-100' : 'opacity-0 pointer-events-none'">
              <div class="flex flex-col gap-0">
                <div v-for="(step, index) in t.features.steps" :key="index" @click="scrollToStep(index)"
                  class="relative flex items-center gap-4 cursor-pointer group transition-all duration-200 py-2">
                  <div v-if="index < t.features.steps.length - 1"
                    class="absolute left-4 top-10 h-12 transition-all duration-200">
                    <div v-if="index < activeStep" class="w-0.5 h-full bg-primary-600"></div>
                    <div v-else class="w-0.5 h-full"
                      style="background: repeating-linear-gradient(to bottom, rgb(209, 213, 219) 0px, rgb(209, 213, 219) 4px, transparent 4px, transparent 8px);">
                    </div>
                  </div>
                  <div class="relative flex items-center justify-center z-10">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                      :class="index < activeStep
                        ? 'bg-primary-600'
                        : index === activeStep
                          ? 'bg-primary-600'
                          : 'bg-gray-300'">
                      <svg v-if="index < activeStep" class="w-5 h-5 text-white" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                      <div v-else-if="index === activeStep" class="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                  </div>
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
import { ref, computed, onMounted, nextTick } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { useVideoPlayer } from '../composables/useVideoPlayer'
import { useMobileSwiper } from '../composables/useMobileSwiper'
import { useDesktopStepper } from '../composables/useDesktopStepper'
import FeatureVideoPlayer from './FeatureVideoPlayer.vue'

// Video imports
import manualFormVideo from './assets/video/manualForm.MP4'
import scanPhotoVideo from './assets/video/scanPhoto.MP4'
import generateTextVideo from './assets/video/generateText.MP4'
import chatbotVideo from './assets/video/chatbot.MP4'
import exportImportVideo from './assets/video/exportImport.MP4'
import chartVideo from './assets/video/chart.MP4'

// Placeholder image import
import heroPlaceholder from './assets/hero.png'

const { t } = useI18n()
const { elementRef: sectionRef } = useScrollAnimation()

// Video sources array
const videoSources = [
  manualFormVideo,
  scanPhotoVideo,
  generateTextVideo,
  chatbotVideo,
  exportImportVideo,
  chartVideo,
]

// Get steps count
const stepsCount = computed(() => {
  return (t && t.features && Array.isArray(t.features.steps)) ? t.features.steps.length : 6
})

// Active step state
const activeStep = ref(0)
const stepRefs = ref([])

// Use composables
const {
  videoPlaying,
  videoReady,
  videoLoading,
  videoStarted,
  videoShouldLoad,
  initializeVideoRefs,
  initializeVideoState,
  shouldLoadVideo,
  onVideoLoaded,
  startVideo,
  playVideo,
  pauseVideo,
  setVideoRef,
  markVideoForLoading,
  setVideoReady,
  setVideoPlaying,
} = useVideoPlayer(videoSources, stepsCount.value)

const {
  swiperContainer,
  swiperWidth,
  slideRefs,
  goToSlide,
  onSwiperScroll,
  onTouchStart,
  onTouchEnd,
  setupObservers,
} = useMobileSwiper(activeStep, stepsCount.value)

const {
  stepperRef,
  showStepper,
  scrollToStep,
  setupObservers: setupStepperObservers,
} = useDesktopStepper(activeStep, stepRefs)

// Load video source helper for lazy loading
const loadVideoSource = (video, index) => {
  if (video && !video.src) {
    video.src = videoSources[index]
    video.load()
  }
}

// Initialize on mount
onMounted(() => {
  initializeVideoRefs()
  initializeVideoState()

  nextTick(() => {
    // Setup mobile swiper observers (lazy loading only)
    setupObservers(markVideoForLoading, loadVideoSource)

    // Preload and auto-play first video - optimized for mobile performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024
    if (isMobile) {
      // Defer first video loading to allow initial render to complete
      requestAnimationFrame(() => {
        setTimeout(() => {
          initializeVideoRefs()
          markVideoForLoading(0)
          startVideo(0)
        }, 150)
      })
    } else {
      // Desktop: load immediately
      setTimeout(() => {
        initializeVideoRefs()
        markVideoForLoading(0)
        startVideo(0)
      }, 100)
    }

    // Setup desktop stepper observers
    setTimeout(() => {
      setupStepperObservers(markVideoForLoading)
    }, 100)
  })
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.swiper-container {
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}

.swiper-slide {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

@media (prefers-reduced-motion: reduce) {
  .swiper-container {
    scroll-behavior: auto;
  }
}

@keyframes pulse-loader {

  0%,
  100% {
    opacity: 0.6;
    transform: scale(0.9);
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

@keyframes ping-loader {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  50%,
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}

@keyframes pulse-text {

  0%,
  100% {
    opacity: 0.7;
  }

  50% {
    opacity: 1;
  }
}

@keyframes pulse-ring {

  0%,
  100% {
    opacity: 0.4;
    transform: scale(0.95);
  }

  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

@keyframes bounce-delay-0 {

  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }

  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce-delay-1 {

  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }

  20%,
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce-delay-2 {

  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }

  40%,
  60% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-pulse-loader {
  animation: pulse-loader 1.5s ease-in-out infinite;
}

.animate-ping-loader {
  animation: ping-loader 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-pulse-text {
  animation: pulse-text 2s ease-in-out infinite;
}

.animate-pulse-ring {
  animation: pulse-ring 2s ease-in-out infinite;
}

.animate-bounce-delay-0 {
  animation: bounce-delay-0 1.4s ease-in-out infinite;
}

.animate-bounce-delay-1 {
  animation: bounce-delay-1 1.4s ease-in-out infinite;
  animation-delay: 0.2s;
}

.animate-bounce-delay-2 {
  animation: bounce-delay-2 1.4s ease-in-out infinite;
  animation-delay: 0.4s;
}
</style>
