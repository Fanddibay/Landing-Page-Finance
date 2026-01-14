<template>
  <section class="py-16 md:py-24 bg-slate-50">
    <div class="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div ref="sectionRef"
        :class="['w-full max-w-[1035px] mx-auto px-4 sm:px-6', isVisible ? 'fade-in-up visible' : 'fade-in-up']">
        <!-- Two Column Layout -->
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <!-- Left Column: Title -->
          <div>
            <h2 class="text-3xl font-semibold text-gray-900">
              {{ t.faq.title }}
            </h2>
          </div>

          <!-- Right Column: FAQ Items -->
          <div class="space-y-4">
            <div v-for="(item, index) in t.faq.items" :key="index"
              class="bg-white rounded-xl p-6 transition-all duration-200">
              <button @click="toggleFAQ(index)" class="w-full flex items-center justify-between text-left">
                <h3 class="text-lg font-semibold text-gray-900 pr-4">
                  {{ item.question }}
                </h3>
                <!-- Plus/Minus Icon -->
                <svg v-if="!openFAQs[index]" class="w-5 h-5 text-primary-600 shrink-0 transition-all duration-200"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <svg v-else class="w-5 h-5 text-primary-600 shrink-0 transition-all duration-200" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
              </button>
              <div v-if="openFAQs[index]" class="mt-4 text-gray-600 leading-relaxed">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { t } = useI18n()
const { elementRef: sectionRef, isVisible } = useScrollAnimation()
const openFAQs = ref({})

const toggleFAQ = (index) => {
  openFAQs.value[index] = !openFAQs.value[index]
}
</script>
