<template>
  <section id="contact" class="relative py-16 md:py-14 overflow-hidden">

    <div class="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Contact Card -->

      <div ref="sectionRef"
        :class="['bg-green-100 rounded-2xl px-4 sm:px-6 md:px-12  overflow-visible w-full max-w-[1035px] mx-auto', isVisible ? 'fade-in-up visible' : 'fade-in-up']">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          <!-- Left Side: Hand Mockup Image -->
          <div class="flex justify-center lg:justify-start order-2 lg:order-1 relative -mt-24 ">
            <img :src="contactImage" alt="Contact" class="w-full max-w-md lg:max-w-lg h-auto object-contain">
          </div>

          <!-- Right Side: Content -->
          <div class="flex flex-col justify-center space-y-2 order-1 lg:order-2 pt-8 lg:py-0 ">
            <h2 class="text-3xl font-semibold text-gray-900 leading-tight mb-4">
              {{ t.contact.title }}
            </h2>
            <p class="text-base text-gray-600 leading-relaxed max-w-2xl ">
              {{ extendedSubtitle }}
            </p>
            <div class="pt-2">
              <a :href="`mailto:${email}`"
                class="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                <span>{{ t.contact.sendEmail }}</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import contactImage from './assets/handMockup.png'

const { t, currentLanguage } = useI18n()
const { elementRef: sectionRef, isVisible } = useScrollAnimation()
const email = 'fandi.bayu110@gmail.com'

const extendedSubtitle = computed(() => {
  const baseSubtitle = t.value.contact.subtitle
  const additionalText = {
    EN: " Send us a message and we'll get back to you as soon as possible. Whether you have questions about our services, need technical support, or want to learn more about how we can help you manage your finances better, we're here to assist you every step of the way.",
    ID: " Kirimkan pesan kepada kami dan kami akan segera menghubungi Anda kembali. Baik Anda memiliki pertanyaan tentang layanan kami, membutuhkan dukungan teknis, atau ingin mempelajari lebih lanjut tentang bagaimana kami dapat membantu Anda mengelola keuangan dengan lebih baik, kami siap membantu Anda di setiap langkahnya."
  }
  return baseSubtitle + (additionalText[currentLanguage.value] || additionalText.EN)
})
</script>
