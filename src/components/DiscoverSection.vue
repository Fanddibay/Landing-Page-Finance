<template>
  <section class="py-16 md:py-24 bg-beige-light">
    <div class="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div ref="sectionRef"
        :class="['grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full max-w-[1035px] mx-auto px-4 sm:px-6', isVisible ? 'fade-in-up visible' : 'fade-in-up']">
        <!-- Phone Mockup -->
        <div class="order-2 lg:order-1 flex justify-center">
          <div class="relative w-64 md:w-[300px]">
            <div class="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
              <div class="bg-white rounded-[2rem] overflow-hidden">
                <div class="bg-gradient-to-br from-green-50 to-white  h-[500px] md:h-[600px]">
                  <img :src="summaryImage" alt="Discover Image" class="w-full h-full object-contain">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="order-1 lg:order-2 space-y-6">
          <h2 class="text-3xl font-semibold text-gray-900 leading-tight mb-4">
            {{ t.discover.title }}
          </h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            {{ t.discover.description }}
          </p>
          <div class="pt-4">
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop&q=80"
              alt="People using finance app" class="rounded-2xl shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import summaryImage from './assets/summary.png'

const { t } = useI18n()
const { elementRef: sectionRef, isVisible } = useScrollAnimation()
</script>
