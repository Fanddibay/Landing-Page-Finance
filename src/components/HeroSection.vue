<template>
  <section id="home" class="pt-24 md:pt-32 pb-16 md:pb-24 bg-white relative overflow-hidden">
    <div class="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Top Section: Headline, Subtitle, CTA -->
      <div class="text-center w-full max-w-[1035px] mx-auto px-3 sm:px-6 mb-8 md:mb-12">
        <!-- Headline with Staggered Animation -->
        <h1 ref="titleRef"
          :class="['text-4xl font-semibold text-gray-900 leading-tight mb-6 lg:w-[60%] md:w-[80%] sm:w-[90%] w-full mx-auto', isTitleVisible ? 'title-reveal visible' : 'title-reveal']">
          {{ t.hero.headline }}
        </h1>

        <!-- Subtitle with Green Accent -->
        <p ref="subtitleRef"
          :class="['text-lg text-gray-600 mb-8 leading-relaxed', isSubtitleVisible ? 'fade-in-up visible' : 'fade-in-up']"
          style="transition-delay: 0.3s;">
          <span v-html="highlightedSubtitle"></span>
        </p>

        <!-- CTA Button -->
        <div ref="ctaRef" :class="['flex justify-center ', isCTAVisible ? 'fade-in-up visible' : 'fade-in-up']"
          style="transition-delay: 0.5s;">
          <a href="https://financial-webapp.netlify.app/" target="_blank"
            class="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-800 text-white font-semibold rounded-full hover:bg-primary-900 transition-all duration-200 shadow-lg hover:shadow-xl">
            {{ t.header.tryNow }}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Bottom Section: 3 Phone Mockups -->
      <div ref="phonesRef"
        :class="['relative flex justify-center mt-24  items-start pt-3', isPhonesVisible ? 'fade-in visible' : 'fade-in']">
        <!-- Left Phone (Partially Visible) -->
        <div
          class="absolute left-1/2 bottom-0 transform -translate-x-[120%] md:-translate-x-[110%] -rotate-12 md:-rotate-6 z-10 opacity-80">
          <div class="w-32 md:w-40 lg:w-48 h-52">
            <div class="bg-gray-900 rounded-[2.5rem] p-1.5 shadow-2xl">
              <div class="bg-white rounded-[2rem] overflow-hidden">
                <div class="bg-gradient-to-br from-green-50 to-white h-[350px] md:h-[400px]">
                  <img :src="chartImage" alt="Chart" class="w-full h-full object-cover" loading="lazy" decoding="async">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Middle Phone (Most Prominent) -->
        <div class="relative z-20 transform translate-y-0">
          <div class="w-36 md:w-44 lg:w-52 h-52">
            <div class="bg-gray-900 rounded-[2.5rem] p-1.5 shadow-2xl">
              <div class="bg-white rounded-[2rem] overflow-hidden">
                <div class="bg-gradient-to-br from-green-50 to-white h-[400px] md:h-[450px]">
                  <img :src="heroImage" alt="Hero" class="w-full h-full object-cover" loading="eager" decoding="async">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Phone (Partially Visible) -->
        <div
          class="absolute left-1/2 bottom-0 transform translate-x-[20%] md:translate-x-[10%] rotate-12 md:rotate-6 z-10 opacity-80">
          <div class="w-32 md:w-40 lg:w-48 h-52">
            <div class="bg-gray-900 rounded-[2.5rem] p-1.5 shadow-2xl">
              <div class="bg-white rounded-[2rem] overflow-hidden">
                <div class="bg-gradient-to-br from-primary-900 to-primary-800 h-[350px] md:h-[400px]">
                  <img :src="summaryImage" alt="Summary" class="w-full h-full object-cover opacity-90" loading="lazy" decoding="async">
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- Gradient Border Line -->
      <div
        class="z-40 mx-auto flex justify-center absolute bottom-0 w-1/2 rounded-full h-1 left-1/2 -translate-x-1/2 overflow-hidden"
        style="background: linear-gradient(to right, #16a34a, #22c55e, #4ade80, #f97316, #fb923c, #f97316);"></div>
    </div>


  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import heroImage from './assets/hero.png'
import chartImage from './assets/chart.png'
import summaryImage from './assets/summary.png'

const { t } = useI18n()
const { elementRef: titleRef, isVisible: isTitleVisible } = useScrollAnimation({ threshold: 0.3 })
const { elementRef: subtitleRef, isVisible: isSubtitleVisible } = useScrollAnimation({ threshold: 0.2, rootMargin: '0px 0px -50px 0px' })
const { elementRef: ctaRef, isVisible: isCTAVisible } = useScrollAnimation({ threshold: 0.2, rootMargin: '0px 0px -50px 0px' })
const { elementRef: phonesRef, isVisible: isPhonesVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

// Highlight key words/numbers in subtitle with green accent
const highlightedSubtitle = computed(() => {
  const subtitle = t.value?.hero?.subheadline || ''
  if (!subtitle) return ''
  // Highlight numbers or key phrases with green color
  return subtitle.replace(/(\d+%?|\bAI\b|\bpowered\b|effectively|finally|all in one)/gi, '<span class="text-green-600 font-semibold">$1</span>')
})
</script>
