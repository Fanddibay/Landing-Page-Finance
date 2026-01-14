<template>
  <section class="py-16 md:py-24 bg-slate-50">
    <div class="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Header -->
      <div class="mb-12 md:mb-16 w-full max-w-[1035px] mx-auto px-4 sm:px-6">
        <h2 class="text-3xl font-semibold text-gray-900 flex items-center gap-3 mb-4">
          {{ t.clarity.title }}
        </h2>
      </div>

      <!-- Mobile: Horizontal Scrollable Tabs -->
      <div class="lg:hidden mb-8">
        <div class="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          <button v-for="(step, index) in steps" :key="index" @click="activeStep = index" :class="[
            'flex-shrink-0 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200',
            activeStep === index
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
          ]">
            {{ step.label }}
          </button>
        </div>
      </div>

      <!-- Main Content: 3 Column Layout -->
      <div ref="sectionRef"
        :class="['grid lg:grid-cols-3 gap-8 lg:gap-12 items-start w-full max-w-[1035px] mx-auto px-4 sm:px-6', isVisible ? 'fade-in-up visible' : 'fade-in-up']">
        <!-- Left: Flow Steps -->
        <div class="lg:col-span-1 space-y-6 order-2 lg:order-1 lg:block hidden">
          <button v-for="(step, index) in steps" :key="index" @click="activeStep = index" :class="[
            'w-full flex items-start gap-4 transition-all duration-200 text-left',
            activeStep === index ? 'opacity-100' : 'opacity-60 hover:opacity-80'
          ]">
            <div :class="[
              'flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200',
              activeStep === index
                ? 'bg-primary-600 shadow-lg'
                : 'bg-primary-100'
            ]">
              <!-- Plus Icon -->
              <svg v-if="step.iconType === 'plus'" :class="[
                'w-6 h-6 transition-all duration-200',
                activeStep === index ? 'text-white' : 'text-primary-600'
              ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <!-- Search Icon -->
              <svg v-else-if="step.iconType === 'search'" :class="[
                'w-6 h-6 transition-all duration-200',
                activeStep === index ? 'text-white' : 'text-primary-600'
              ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <!-- Action Icon -->
              <svg v-else-if="step.iconType === 'action'" :class="[
                'w-6 h-6 transition-all duration-200',
                activeStep === index ? 'text-white' : 'text-primary-600'
              ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <!-- Chart Icon -->
              <svg v-else-if="step.iconType === 'chart'" :class="[
                'w-6 h-6 transition-all duration-200',
                activeStep === index ? 'text-white' : 'text-primary-600'
              ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <!-- Check Icon -->
              <svg v-else-if="step.iconType === 'check'" :class="[
                'w-6 h-6 transition-all duration-200',
                activeStep === index ? 'text-white' : 'text-primary-600'
              ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="flex-1 pt-2">
              <h3 class="text-lg font-semibold text-primary-800">{{ step.label }}</h3>
            </div>
          </button>
        </div>

        <!-- Center: Phone Mockup -->
        <div class="lg:col-span-1 flex justify-center order-1 lg:order-2">
          <div class="relative w-56 md:w-64 lg:w-72">
            <Transition name="fade" mode="out-in">
              <div :key="activeStep"
                class="bg-black rounded-[2.5rem] p-1.5 shadow-2xl transform rotate-[-8deg] md:rotate-[-6deg] hover:rotate-[-4deg] transition-transform duration-300">
                <div class="bg-white rounded-[2rem] overflow-hidden">
                  <div class="bg-white h-[500px] md:h-[600px]">
                    <img :src="currentStep.image" alt="Finance App" class="w-full h-full object-contain">
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Right: Dynamic Content Detail -->
        <div class="lg:col-span-1 space-y-6 order-3">
          <Transition name="fade-slide" mode="out-in">
            <div :key="activeStep">
              <div class="flex items-center gap-3 mb-4">

                <h3 class="text-2xl md:text-3xl font-bold text-gray-600">
                  {{ currentStep.title }}
                </h3>
              </div>

              <p class="text-lg md:text-xl font-semibold text-gray-500 leading-relaxed">
                {{ currentStep.subtitle }}
              </p>

              <p class="text-base md:text-lg text-gray-400 leading-relaxed">
                {{ currentStep.description }}
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useScrollAnimation } from '../composables/useScrollAnimation'

// Images
import heroImage from './assets/hero.png'
import optionFeaturesImage from './assets/optionFeature.png'
import formTransactionImage from './assets/formTransaction.png'
import chartImage from './assets/chart.png'
import importData from './assets/importData.png'

const { t } = useI18n()
const { elementRef: sectionRef, isVisible } = useScrollAnimation()
const activeStep = ref(0)

// Icon types for each step
const iconTypes = ['plus', 'search', 'action', 'chart', 'check']
const images = [heroImage, optionFeaturesImage, formTransactionImage, chartImage, importData]

// Steps Data - computed from translations
const steps = computed(() => {
  const translations = t.value
  if (!translations?.clarity?.steps) {
    return []
  }
  const stepKeys = ['signUp', 'explore', 'takeAction', 'trackProgress', 'feelConfident']
  return stepKeys.map((key, index) => {
    const stepData = translations.clarity.steps[key]
    if (!stepData) {
      return {
        label: '',
        iconType: iconTypes[index],
        title: '',
        subtitle: '',
        description: '',
        image: images[index]
      }
    }
    return {
      label: stepData.label || '',
      iconType: iconTypes[index],
      title: stepData.title || '',
      subtitle: stepData.subtitle || '',
      description: stepData.description || '',
      image: images[index]
    }
  })
})

const currentStep = computed(() => steps.value[activeStep.value])
</script>

<style scoped>
/* Hide scrollbar for mobile tabs */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Fade Transition for Phone Mockup */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Fade + Slide Transition for Content */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>