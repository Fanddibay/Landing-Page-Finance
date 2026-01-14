<template>
  <section class="relative py-16 md:py-24 overflow-hidden">
    <!-- Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-beige-light via-green-50 to-primary-50"></div>

    <!-- Background Silhouette Images -->
    <div class="absolute inset-0 opacity-10 md:opacity-15">
      <!-- Left side silhouette -->
      <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 md:-translate-x-1/3">
        <img :src="summaryImage" alt="Finance App Silhouette"
          class="w-64 md:w-96 lg:w-[500px] h-auto object-contain blur-sm">
      </div>

      <!-- Right side silhouette -->
      <div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 md:translate-x-1/3">
        <img :src="chartImage" alt="Finance Chart Silhouette"
          class="w-64 md:w-96 lg:w-[500px] h-auto object-contain blur-sm scale-x-[-1]">
      </div>

      <!-- Center subtle pattern -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div ref="sectionRef"
        :class="['w-full max-w-[1035px] mx-auto px-4 sm:px-6 text-center space-y-8', isVisible ? 'fade-in-up visible' : 'fade-in-up']">
        <h2 class="text-3xl font-semibold text-gray-900 leading-tight mb-4">
          {{ t.cta.title }}
        </h2>
        <p class="text-lg text-gray-600">
          {{ t.cta.subtitle }}
        </p>
        <div class="pt-4">
          <a href="#pricing"
            class="inline-flex items-center justify-center px-8 py-4 bg-primary-800 text-white font-semibold rounded-lg hover:bg-primary-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
            {{ t.cta.button }}
          </a>
        </div>
      </div>
    </div>

    <!-- Decorative elements -->
    <div class="absolute top-0 left-1/4 w-32 h-32 bg-primary-200 rounded-full blur-3xl opacity-30"></div>
    <div class="absolute bottom-0 right-1/4 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-30"></div>
  </section>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import summaryImage from './assets/summary.png'
import chartImage from './assets/chart.png'

const { t } = useI18n()
const { elementRef: sectionRef, isVisible } = useScrollAnimation()
</script>
