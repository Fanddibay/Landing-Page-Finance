<template>
  <section class="py-16 md:py-24 bg-green-50">
    <div class="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div ref="sectionRef"
        :class="['grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full max-w-[1035px] mx-auto px-4 sm:px-6', isVisible ? 'fade-in-up visible' : 'fade-in-up']">
        <!-- Content -->
        <div class="space-y-6">
          <h2 class="text-3xl font-semibold text-gray-900 leading-tight mb-4">
            {{ t.proTools.title }}
          </h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            {{ t.proTools.description }}
          </p>

          <!-- Benefits -->
          <ul class="space-y-4 pt-4">
            <li class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-lg text-gray-700">{{ t.proTools.benefit1 }}</span>
            </li>
            <li class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-lg text-gray-700">{{ t.proTools.benefit2 }}</span>
            </li>
          </ul>


          <div class="pt-4">
            <a href="#pricing"
              class="inline-flex items-center justify-center px-8 py-2.5 text-sm bg-primary-800 text-white font-semibold rounded-full hover:bg-primary-900 transition-all duration-200 shadow-md hover:shadow-lg">
              {{ t.proTools.button }}
            </a>
          </div>
        </div>

        <!-- Dashboard Mockup -->
        <div class="flex justify-center">
          <div class="group relative w-64 md:w-[340px] transition-all duration-300 hover:scale-105">
            <!-- Phone Frame -->
            <div
              class="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl transition-all duration-300 group-hover:shadow-green-500/50">
              <div class="bg-white rounded-[2rem] overflow-hidden relative">
                <!-- Screen with iframe -->
                <div class="bg-gradient-to-br from-green-50 to-white h-[500px] md:h-[600px] relative">
                  <!-- Loading State -->
                  <div v-if="isLoading"
                    class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 to-white z-10">
                    <div class="text-center">
                      <div
                        class="inline-block animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-4 border-green-500 border-t-transparent mb-4">
                      </div>
                      <p class="text-primary-800 font-medium text-sm md:text-base">Memuat aplikasi...</p>
                    </div>
                  </div>

                  <!-- Error State -->
                  <div v-if="hasError"
                    class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 to-white z-10">
                    <div class="text-center px-4">
                      <svg class="w-12 h-12 md:w-16 md:h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p class="text-primary-800 font-medium text-sm md:text-base mb-2">Gagal memuat aplikasi</p>
                      <button @click="reloadIframe"
                        class="text-green-600 hover:text-green-700 text-xs md:text-sm font-semibold underline">
                        Coba lagi
                      </button>
                    </div>
                  </div>

                  <!-- Iframe -->
                  <iframe v-show="!isLoading && !hasError" ref="demoIframe" src="https://financial-webapp.netlify.app/"
                    class="w-full h-full border-0" frameborder="0" allow="clipboard-read; clipboard-write"
                    allowfullscreen @load="handleIframeLoad" @error="handleIframeError" title="Financial Web App Demo">
                  </iframe>
                </div>
              </div>
            </div>

            <!-- Floating Badge -->
            <div
              class="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12 group-hover:rotate-6 transition-transform duration-300 z-10 flex items-center gap-1">
              <span class="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE DEMO
            </div>

            <!-- Open in New Tab Button -->
            <a href="https://financial-webapp.netlify.app/" target="_blank" rel="noopener noreferrer"
              class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-primary-800 text-xs font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-green-50 transition-all duration-200 opacity-0 group-hover:opacity-100 flex items-center gap-2 whitespace-nowrap">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Buka di Tab Baru
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { t } = useI18n()
const { elementRef: sectionRef, isVisible } = useScrollAnimation()

const demoIframe = ref(null)
const isLoading = ref(true)
const hasError = ref(false)

const handleIframeLoad = () => {
  isLoading.value = false
  hasError.value = false
}

const handleIframeError = () => {
  isLoading.value = false
  hasError.value = true
}

const reloadIframe = () => {
  hasError.value = false
  isLoading.value = true
  if (demoIframe.value) {
    // Force reload by changing src
    const currentSrc = demoIframe.value.src
    demoIframe.value.src = ''
    setTimeout(() => {
      demoIframe.value.src = currentSrc
    }, 100)
  }
}

// Set timeout fallback if iframe doesn't load
onMounted(() => {
  setTimeout(() => {
    if (isLoading.value) {
      isLoading.value = false
      // If still loading after 10 seconds, might be an error
      if (!demoIframe.value?.contentWindow) {
        hasError.value = true
      }
    }
  }, 10000)
})
</script>
