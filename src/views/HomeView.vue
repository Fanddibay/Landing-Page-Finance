<template>
    <div class="min-h-screen bg-white">
        <Header />
        <main>
            <HeroSection />
            <FeaturesSection />
            <ProToolsSection />
            <ClaritySection />
            <PricingSection />
            <FAQSection />
            <ContactSection />
        </main>
        <Footer />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import Header from '../components/Header.vue'
import HeroSection from '../components/HeroSection.vue'
import FeaturesSection from '../components/FeaturesSection.vue'
import ProToolsSection from '../components/ProToolsSection.vue'
import ClaritySection from '../components/ClaritySection.vue'
import PricingSection from '../components/PricingSection.vue'
import FAQSection from '../components/FAQSection.vue'
import ContactSection from '../components/ContactSection.vue'
import Footer from '../components/Footer.vue'

const { initLanguage } = useI18n()

onMounted(() => {
    initLanguage()
})
</script>
