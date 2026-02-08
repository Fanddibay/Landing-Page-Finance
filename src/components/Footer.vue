<template>
  <footer class="relative overflow-hidden py-4 md:py-0 bg-slate-50">
    <!-- Card Container -->
    <div class="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 ">
      <div ref="footerRef"
        :class="[' rounded-2xl px-8 md:px-0 py-8 md:py-12 w-full max-w-[1035px] mx-auto px-4 sm:px-6', isVisible ? 'fade-in-up visible' : 'fade-in-up']">
        <div class="grid md:grid-cols-6 gap-8 md:gap-12 mb-8">
          <!-- Brand Section -->
          <div class="space-y-4 col-span-3">
            <div class="flex items-center space-x-2 mb-4">
              <img :src="logo" alt="Fanplanner Logo" class="h-8 md:h-10">

            </div>

            <p class="text-gray-700 leading-relaxed text-xs">
              {{ t.footer.description }}
            </p>
          </div>

          <!-- Features Column -->
          <div class="space-y-4 col-span-2">
            <h3 class="text-gray-900 font-semibold text-lg mb-4">
              {{ t.footer.features.title }}
            </h3>
            <ul class="space-y-2">
              <li>
                <a href="#features" class="text-gray-700 hover:text-primary-600 transition-colors">
                  {{ t.footer.features.smartTracking }}
                </a>
              </li>
              <li>
                <a href="#features" class="text-gray-700 hover:text-primary-600 transition-colors">
                  {{ t.footer.features.receiptScanning }}
                </a>
              </li>
              <li>
                <a href="#features" class="text-gray-700 hover:text-primary-600 transition-colors">
                  {{ t.footer.features.verifiedRecords }}
                </a>
              </li>
              <li>
                <a href="#features" class="text-gray-700 hover:text-primary-600 transition-colors">
                  {{ t.footer.features.securePrivate }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Company Column -->
          <div class="space-y-4 col-span-1">
            <h3 class="text-gray-900 font-semibold text-lg mb-4">
              {{ t.footer.company.title }}
            </h3>
            <ul class="space-y-2">
              <li>
                <a href="#about" class="text-gray-700 hover:text-primary-600 transition-colors">
                  {{ t.footer.company.about }}
                </a>
              </li>
              <li>
                <a href="#pricing" class="text-gray-700 hover:text-primary-600 transition-colors">
                  {{ t.footer.company.pricing }}
                </a>
              </li>
              <li>
                <a href="#faq" class="text-gray-700 hover:text-primary-600 transition-colors">
                  {{ t.footer.company.faq }}
                </a>
              </li>
              <li>
                <a href="#contact" class="text-gray-700 hover:text-primary-600 transition-colors">
                  {{ t.footer.company.contact }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="border-t border-gray-200 pt-8 text-center">
          <p class="text-gray-600">{{ t.footer.copyright }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import logo from './assets/logo.svg'

const { t } = useI18n()
const { elementRef: footerRef, isVisible } = useScrollAnimation()
</script>
