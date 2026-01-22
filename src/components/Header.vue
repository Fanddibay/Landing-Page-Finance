<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-sm border-b border-slate-50 shadow-sm transition-all duration-300"
    :class="{ 'shadow-md': isScrolled }">
    <nav class="w-full max-w-[1035px] mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo (Left) -->
        <div class="shrink-0">
          <a href="#home" class="flex items-center space-x-2 group">
            <img :src="logo" alt="Fanplanner Logo" class="h-8 md:h-10">

          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8 flex-1 justify-center">
          <a v-for="(label, key) in t.nav" :key="key" :href="`#${key}`"
            class="text-primary-800 hover:text-primary-600 font-medium transition-colors duration-200">
            {{ label }}
          </a>
        </div>

        <!-- Right Side: Language Switcher & Sign Up Button (Desktop) / Language Switcher & Hamburger (Mobile) -->
        <div class="flex items-center space-x-4">
          <!-- Language Switcher (Mobile & Desktop) -->
          <div class="flex items-center space-x-2 bg-white rounded-lg p-1 border border-green-200">
            <button @click="setLanguage('ID')"
              class="px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200" :class="currentLanguage === 'ID'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'text-primary-700 hover:text-primary-900'">
              ID
            </button>
            <button @click="setLanguage('EN')"
              class="px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200" :class="currentLanguage === 'EN'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'text-primary-700 hover:text-primary-900'">
              EN
            </button>
          </div>

          <!-- Sign Up Button (Desktop Only) -->
          <a href="#pricing"
            class="hidden md:inline-flex items-center justify-center px-6 py-2 bg-primary-800 text-white font-semibold rounded-full hover:bg-primary-900 transition-all duration-200 shadow-sm hover:shadow-md">
            {{ t.header.signUp }}
          </a>

          <!-- Mobile Menu Button (Right) -->
          <button @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg text-primary-800 hover:bg-green-100 transition-colors"
            aria-label="Toggle menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden pb-4 space-y-2 border-t border-green-200 mt-2 pt-4">
        <a v-for="(label, key) in t.nav" :key="key" :href="`#${key}`" @click="mobileMenuOpen = false"
          class="block px-4 py-2 text-primary-800 hover:text-primary-600 hover:bg-green-50 rounded-lg font-medium transition-colors duration-200">
          {{ label }}
        </a>
        <a href="#pricing" @click="mobileMenuOpen = false"
          class="block px-4 py-2 bg-primary-800 text-white font-semibold rounded-lg text-center hover:bg-primary-900 transition-colors duration-200">
          {{ t.header.signUp }}
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import logo from './assets/logo.svg'

const { t, currentLanguage, setLanguage, initLanguage } = useI18n()
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  initLanguage()
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
