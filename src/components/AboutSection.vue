<template>
  <section id="about" class="py-16 md:py-24 bg-white">
    <div class="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div ref="sectionRef" :class="['w-full max-w-[1035px] mx-auto px-4 sm:px-6', isVisible ? 'fade-in-up visible' : 'fade-in-up']">
        <!-- Header -->
        <div class="text-center mb-12 md:mb-16">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {{ t.about.title }}
          </h2>
          <p class="text-xl text-gray-600">
            {{ t.about.subtitle }}
          </p>
        </div>

        <!-- Description -->
        <div class="prose prose-lg max-w-none mb-12 text-center">
          <p class="text-gray-700 leading-relaxed">
            {{ t.about.description }}
          </p>
        </div>

        <!-- Two Column Layout -->
        <div class="grid md:grid-cols-2 gap-8 md:gap-12">
          <!-- Problems -->
          <div class="bg-red-50 rounded-2xl p-6 md:p-8">
            <h3 class="text-xl font-bold text-gray-900 mb-4">
              {{ t.about.problemTitle }}
            </h3>
            <ul class="space-y-3">
              <li
                v-for="(problem, index) in t.about.problems"
                :key="index"
                class="flex items-start space-x-3"
              >
                <svg class="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span class="text-gray-700">{{ problem }}</span>
              </li>
            </ul>
          </div>

          <!-- Solutions -->
          <div class="bg-primary-50 rounded-2xl p-6 md:p-8">
            <h3 class="text-xl font-bold text-gray-900 mb-4">
              {{ t.about.solutionTitle }}
            </h3>
            <ul class="space-y-3">
              <li
                v-for="(solution, index) in t.about.solutions"
                :key="index"
                class="flex items-start space-x-3"
              >
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">{{ solution }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Image -->
        <div class="mt-12 md:mt-16">
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop&q=80"
            alt="Modern finance management"
            class="w-full h-auto rounded-2xl shadow-xl object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { t } = useI18n()
const { elementRef: sectionRef, isVisible } = useScrollAnimation()
</script>

