<template>
  <section id="pricing" class="py-16 md:py-24 bg-soft-green-light">
    <div class="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Header -->
      <div ref="headerRef"
        :class="['text-center mb-12 md:mb-16', isHeaderVisible ? 'fade-in-up visible' : 'fade-in-up']">
        <h2 class="text-3xl font-semibold text-gray-900 mb-4">
          {{ t.pricing.title }}
        </h2>
        <p class="text-lg text-gray-600">
          {{ t.pricing.subtitle }}
        </p>
      </div>

      <!-- Pricing Cards -->
      <div ref="cardsRef"
        :class="['grid md:grid-cols-2 gap-8 lg:gap-12 w-full max-w-[1035px] mx-auto px-4 sm:px-6', isVisible ? 'fade-in-up visible' : 'fade-in-up']">
        <!-- Basic Plan -->
        <div
          class="bg-white rounded-3xl p-8 md:p-10 shadow-xl transform hover:scale-105 transition-transform duration-300 border-2 border-primary-200 relative flex flex-col">
          <div class="text-center mb-8">
            <h3 class="text-2xl md:text-3xl font-bold text-primary-800 mb-2">
              {{ t.pricing.basic.name }}
            </h3>
            <p class="text-primary-600 text-sm md:text-base mb-4">
              {{ t.pricing.basic.description }}
            </p>
            <div class="flex flex-col items-center">
              <span ref="basicPriceRef"
                :class="['text-5xl md:text-6xl font-bold text-primary-800', isBasicPriceVisible ? 'price-reveal visible' : 'price-reveal']">
                {{ t.pricing.basic.price }}
              </span>
              <span class="text-primary-600 text-sm mt-2">
                {{ t.pricing.basic.priceSubtext }}
              </span>
            </div>
          </div>

          <!-- Features List -->
          <ul class="space-y-4 mb-8 flex-grow">
            <li v-for="(feature, index) in t.pricing.basic.features" :key="index" class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-primary-600 shrink-0 mt-0.5" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-primary-700 text-base md:text-lg">{{ feature }}</span>
            </li>
          </ul>

          <!-- CTA Button -->
          <a href="https://financial-webapp.pages.dev/" target="_blank" rel="noopener noreferrer"
            class="block w-full bg-primary-200 text-primary-800 text-center font-semibold py-4 px-6 rounded-full hover:bg-primary-300 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg no-underline">
            {{ t.pricing.basic.cta }}
          </a>
        </div>

        <!-- Lifetime License Plan -->
        <div
          class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 md:p-10 shadow-2xl transform hover:scale-105 transition-transform duration-300 border-2 border-primary-400 relative flex flex-col">
          <!-- Most Popular Badge -->
          <div
            class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
            {{ t.pricing.lifetime.badge }}
          </div>

          <div class="text-center mb-8">
            <h3 class="text-2xl md:text-3xl font-bold text-primary-800 mb-2">
              {{ t.pricing.lifetime.name }}
            </h3>
            <p class="text-primary-600 text-sm md:text-base mb-4">
              {{ t.pricing.lifetime.description }}
            </p>
            <div class="flex flex-col items-center relative">
              <!-- Discount Badge - Floating -->
              <div
                class="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-xl transform rotate-12 z-10 border-2 border-white">
                <span class="block">{{ t.pricing.lifetime.discount }}</span>
              </div>

              <!-- Price Container -->
              <div class="flex flex-col items-center gap-2">
                <!-- Original Price - Strikethrough -->
                <div class="flex items-center gap-2">
                  <span
                    class="text-xl md:text-2xl font-semibold text-gray-400 line-through decoration-2 decoration-gray-500">
                    {{ t.pricing.lifetime.originalPrice }}
                  </span>
                </div>

                <!-- Discounted Price - Large and Bold -->
                <div class="flex items-baseline gap-2">
                  <span ref="lifetimePriceRef"
                    :class="['text-5xl md:text-7xl font-bold text-primary-800 leading-none', isLifetimePriceVisible ? 'price-reveal visible' : 'price-reveal']">
                    {{ t.pricing.lifetime.price }}
                  </span>
                </div>

                <!-- Price Subtext -->
                <span class="text-primary-600 text-sm md:text-base mt-1">
                  {{ t.pricing.lifetime.priceSubtext }}
                </span>
              </div>
            </div>
          </div>

          <!-- Features List -->
          <ul class="space-y-4 mb-8 flex-grow">
            <li v-for="(feature, index) in t.pricing.lifetime.features" :key="index" class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-primary-600 shrink-0 mt-0.5" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-primary-700 text-base md:text-lg font-medium">{{ feature }}</span>
            </li>
          </ul>

          <!-- LemonSqueezy Button -->
          <a href="https://fanbayy.lemonsqueezy.com/checkout/buy/7a5f3969-8d20-4f2d-9a40-2ddb167f9ed3?embed=1"
            class="lemonsqueezy-button">
            {{ t.pricing.lifetime.cta }}
          </a>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { t } = useI18n()
const { elementRef: cardsRef, isVisible } = useScrollAnimation({ rootMargin: '0px 0px -100px 0px' })
const { elementRef: headerRef, isVisible: isHeaderVisible } = useScrollAnimation({ threshold: 0.2 })
const { elementRef: basicPriceRef, isVisible: isBasicPriceVisible } = useScrollAnimation({ threshold: 0.3, rootMargin: '0px 0px -50px 0px' })
const { elementRef: lifetimePriceRef, isVisible: isLifetimePriceVisible } = useScrollAnimation({ threshold: 0.3, rootMargin: '0px 0px -50px 0px' })

// Ensure LemonSqueezy script is loaded and buttons are initialized
onMounted(() => {
  nextTick(() => {
    // Load or re-initialize LemonSqueezy script for SPA compatibility
    const initLemonSqueezy = () => {
      // Check if script tag already exists
      const existingScript = document.querySelector('script[src*="lemonsqueezy.com/lemon.js"]')

      if (!existingScript) {
        // Load LemonSqueezy script if not already loaded
        const script = document.createElement('script')
        script.src = 'https://assets.lemonsqueezy.com/lemon.js'
        script.defer = true
        script.onload = () => {
          // Initialize buttons after script loads
          if (window.LemonSqueezy?.Setup) {
            window.LemonSqueezy.Setup()
          }
        }
        document.head.appendChild(script)
      } else {
        // If already loaded, re-initialize buttons
        if (window.LemonSqueezy?.Setup) {
          window.LemonSqueezy.Setup()
        } else {
          // Wait for script to load
          existingScript.addEventListener('load', () => {
            if (window.LemonSqueezy?.Setup) {
              window.LemonSqueezy.Setup()
            }
          })
        }
      }
    }

    // Initialize immediately
    initLemonSqueezy()

    // Re-initialize after a short delay to ensure DOM is ready
    setTimeout(() => {
      if (window.LemonSqueezy?.Setup) {
        window.LemonSqueezy.Setup()
      }
    }, 200)
  })
})
</script>
