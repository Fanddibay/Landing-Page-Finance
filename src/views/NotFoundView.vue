<template>
    <div
        class="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center px-4 py-0">
        <div class="max-w-2xl w-full text-center">
            <!-- Illustration -->
            <div class="mb-8 flex justify-center">
                <div class="relative w-48 h-48 md:w-64 md:h-64">
                    <!-- SVG Illustration with green theme -->
                    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                        <!-- Background circle -->
                        <circle cx="200" cy="200" r="180" fill="#dcfce7" class="animate-pulse-slow" />

                        <!-- Main illustration - Lost document/file -->
                        <g transform="translate(100, 80)">
                            <!-- Document/Page -->
                            <rect x="40" y="20" width="120" height="160" rx="4" fill="#86efac" opacity="0.6" />
                            <rect x="50" y="35" width="100" height="8" rx="2" fill="#16a34a" opacity="0.3" />
                            <rect x="50" y="55" width="80" height="8" rx="2" fill="#16a34a" opacity="0.3" />
                            <rect x="50" y="75" width="90" height="8" rx="2" fill="#16a34a" opacity="0.3" />

                            <!-- Question mark -->
                            <text x="100" y="180" font-family="Arial, sans-serif" font-size="80" font-weight="bold"
                                fill="#16a34a" text-anchor="middle">?</text>

                            <!-- Floating elements -->
                            <circle cx="20" cy="100" r="8" fill="#16a34a" opacity="0.4" class="animate-float"
                                style="animation-delay: 0s;" />
                            <circle cx="180" cy="60" r="6" fill="#22c55e" opacity="0.4" class="animate-float"
                                style="animation-delay: 0.5s;" />
                            <circle cx="160" cy="200" r="10" fill="#86efac" opacity="0.4" class="animate-float"
                                style="animation-delay: 1s;" />
                        </g>
                    </svg>
                </div>
            </div>

            <!-- Error Code -->
            <h1 class="text-3xl md:text-5xl font-bold text-primary-600 mb-4 tracking-tight">
                404
            </h1>

            <!-- Title -->
            <h2 class="text-lg md:text-2xl font-semibold text-gray-900 mb-4">
                Page Not Found
            </h2>

            <!-- Description -->
            <p class="text-sm md:text-base text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                Maaf, halaman yang Anda cari tidak ditemukan. Halaman mungkin telah dipindahkan, dihapus, atau URL yang
                Anda masukkan salah.
            </p>

            <!-- Button -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <router-link to="/"
                    class="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-base md:text-lg">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Kembali ke Halaman Utama
                </router-link>
            </div>

            <!-- Additional Help -->
            <div class="mt-12 pt-8 border-t border-gray-200">
                <p class="text-sm text-gray-500 mb-2">
                    Butuh bantuan?
                </p>
                <div class="flex flex-wrap justify-center gap-4 text-sm">
                    <a href="/#features" class="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                        Fitur
                    </a>
                    <span class="text-gray-300">•</span>
                    <a href="/#pricing" class="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                        Harga
                    </a>
                    <span class="text-gray-300">•</span>
                    <a href="/#contact" class="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                        Kontak
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    // Set page title
    document.title = '404 - Page Not Found | Fanplanner'
})
</script>

<style scoped>
@keyframes pulse-slow {

    0%,
    100% {
        opacity: 0.6;
    }

    50% {
        opacity: 0.8;
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-20px);
    }
}

.animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}
</style>
