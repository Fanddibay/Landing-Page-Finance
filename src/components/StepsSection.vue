<template>
  <section class="py-16 md:py-24 bg-primary-800">
    <div class="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Header -->
      <div class="text-center mb-12 md:mb-16">
        <h2 ref="titleRef"
          :class="['text-3xl font-semibold text-white leading-tight w-full max-w-[1035px] mx-auto px-4 sm:px-6', isTitleVisible ? 'fade-in-up visible' : 'fade-in-up']">
          {{ t.steps.title }}
        </h2>
      </div>

      <!-- Steps Grid -->
      <div ref="stepsRef"
        :class="['grid md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-[1035px] mx-auto px-4 sm:px-6', isStepsVisible ? 'fade-in-up visible' : 'fade-in-up']">
        <!-- Step 1 -->
        <div class="text-center space-y-4">
          <div class="flex justify-center">
            <div class="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
              <span class="text-3xl font-bold text-primary-800">1</span>
            </div>
          </div>
          <div class="flex justify-center mb-4">
            <div class="relative w-48 h-[500px]">
              <div class="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                <div class="bg-white rounded-[2rem] overflow-hidden">
                  <img :src="optionFeatureImage" alt="Chart Image" class="w-full h-full object-contain">
                </div>
              </div>
            </div>
          </div>
          <h3 class="text-xl font-bold text-white">{{ t.steps.step1.title }}</h3>
          <p class="text-green-100">{{ t.steps.step1.description }}</p>
        </div>

        <!-- Step 2 -->
        <div class="text-center space-y-4">
          <div class="flex justify-center">
            <div class="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
              <span class="text-3xl font-bold text-primary-800">2</span>
            </div>
          </div>
          <div class="flex justify-center mb-4">
            <div class="relative w-48 h-[500px]">
              <div class="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                <div class="bg-white rounded-[2rem] overflow-hidden">
                  <img :src="formTransactionImage" alt="Chart Image" class="w-full h-full object-contain">
                </div>
              </div>
            </div>
          </div>
          <h3 class="text-xl font-bold text-white">{{ t.steps.step1.title }}</h3>
          <p class="text-green-100">{{ t.steps.step1.description }}</p>
        </div>

        <!-- Step 3 -->
        <div class="text-center space-y-4">
          <div class="flex justify-center">
            <div class="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
              <span class="text-3xl font-bold text-primary-800">3</span>
            </div>
          </div>
          <div class="flex justify-center mb-4">
            <div class="relative w-48 h-[500px]">
              <div class="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                <div class="bg-white rounded-[2rem] overflow-hidden">
                  <img :src="optionFeatureImage" alt="Chart Image" class="w-full h-full object-contain">
                </div>
              </div>
            </div>
          </div>
          <h3 class="text-xl font-bold text-white">{{ t.steps.step3.title }}</h3>
          <p class="text-green-100">{{ t.steps.step3.description }}</p>
        </div>

        <!-- Step 4 -->
        <div class="text-center space-y-4">
          <div class="flex justify-center">
            <div class="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
              <span class="text-3xl font-bold text-primary-800">4</span>
            </div>
          </div>
          <div class="flex justify-center mb-4">
            <div class="relative w-48 h-[500px]">
              <div class="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                <div class="bg-white rounded-[2rem] overflow-hidden">
                  <img :src="textGeneratedImage" alt="Chart Image" class="w-full h-full object-contain">
                </div>
              </div>
            </div>
          </div>
          <h3 class="text-xl font-bold text-white">{{ t.steps.step4.title }}</h3>
          <p class="text-green-100">{{ t.steps.step4.description }}</p>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="text-center mt-12 space-x-4">
        <a href="#pricing"
          class="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-800 font-semibold rounded-lg hover:bg-green-50 transition-all duration-200 shadow-md hover:shadow-lg">
          {{ t.steps.button }}
        </a>
      </div>
    </div>

  </section>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import optionFeatureImage from './assets/optionFeature.png'
import formTransactionImage from './assets/formTransaction.png'
import textGeneratedImage from './assets/teksGenerated.png'

const { t } = useI18n()
const { elementRef: titleRef, isVisible: isTitleVisible } = useScrollAnimation({ threshold: 0.2 })
const { elementRef: stepsRef, isVisible: isStepsVisible } = useScrollAnimation({ rootMargin: '0px 0px -100px 0px' })
</script>
