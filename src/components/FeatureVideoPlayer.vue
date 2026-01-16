<template>
    <div class="relative w-full bg-gradient-to-br from-green-50 to-white aspect-[9/19.5] overflow-hidden">
        <!-- Static Image Placeholder -->
        <div v-if="!videoStarted" class="absolute inset-0 z-20 flex items-center justify-center">
            <img :src="placeholder" alt="Video placeholder" class="w-full h-full object-cover" />
        </div>

        <!-- Loading Animation -->
        <div v-if="videoLoading"
            class="absolute inset-0 bg-gradient-to-br from-green-50/95 to-white/95 backdrop-blur-sm flex items-center justify-center z-30 transition-opacity duration-300">
            <div class="flex flex-col items-center gap-4">
                <div class="relative w-24 h-24">
                    <div class="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
                    <div
                        class="absolute inset-0 border-4 border-primary-600 border-t-transparent rounded-full animate-spin">
                    </div>
                    <div
                        class="absolute inset-2 border-3 border-primary-400 rounded-full animate-pulse-ring opacity-60">
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-12 h-12 bg-primary-600 rounded-full animate-pulse-loader opacity-80 shadow-lg">
                        </div>
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-5 h-5 bg-primary-700 rounded-full animate-ping-loader shadow-md"></div>
                    </div>
                </div>
                <div class="text-center space-y-2">
                    <p class="text-sm font-semibold text-primary-700 animate-pulse-text">Memuat video...</p>
                    <div class="flex gap-1.5 justify-center">
                        <div class="w-2 h-2 bg-primary-600 rounded-full animate-bounce-delay-0"></div>
                        <div class="w-2 h-2 bg-primary-600 rounded-full animate-bounce-delay-1"></div>
                        <div class="w-2 h-2 bg-primary-600 rounded-full animate-bounce-delay-2"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Video Element - Always render for lazy loading, but only show when started -->
        <video v-if="videoSrc" :ref="(el) => setVideoRef(el, index, videoType)" :src="videoSrc"
            :data-video-index="index" :data-video-type="videoType"
            class="w-full h-full object-cover transition-opacity duration-500"
            :class="videoReady ? 'opacity-100' : 'opacity-0'" muted loop playsinline
            :preload="index === 0 ? 'auto' : 'metadata'" @loadstart="setVideoLoading(index, true)"
            @waiting="setVideoLoading(index, true)" @progress="handleVideoProgress(index, $event)"
            @loadedmetadata="onVideoLoaded(index)" @canplay="setVideoReady(index, true); setVideoLoading(index, false)"
            @playing="setVideoLoading(index, false)" @play="setVideoPlaying(index, true); setVideoLoading(index, false)"
            @pause="setVideoPlaying(index, false)" @ended="setVideoPlaying(index, false)"
            @click.stop="playVideo(index)"></video>

        <!-- Play Button Overlay (shown on placeholder image) -->
        <button v-if="!videoStarted" @click.stop="startVideo(index)"
            class="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-200 group z-40">
            <div
                class="w-20 h-20 rounded-full bg-primary-500/90 hover:bg-primary-600 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-200 backdrop-blur-sm">
                <svg class="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                </svg>
            </div>
        </button>

        <!-- Play Button (shown when video ready but paused) -->
        <button v-else-if="!videoPlaying && videoReady" @click.stop="playVideo(index)"
            class="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-200 group z-10">
            <div
                class="w-20 h-20 rounded-full bg-primary-500/90 hover:bg-primary-600 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-200 backdrop-blur-sm">
                <svg class="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                </svg>
            </div>
        </button>

        <!-- Pause Button (shown when playing) -->
        <button v-else-if="videoPlaying" @click.stop="pauseVideo(index)"
            class="absolute inset-0 flex items-center justify-center bg-transparent hover:bg-black/10 transition-all duration-200 group opacity-0 hover:opacity-100 z-10">
            <div
                class="w-16 h-16 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-200">
                <svg class="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
            </div>
        </button>
    </div>
</template>

<script setup>
defineProps({
    index: { type: Number, required: true },
    videoType: { type: String, required: true },
    videoSrc: { type: String, required: true },
    placeholder: { type: String, required: true },
    videoStarted: { type: Boolean, required: true },
    videoPlaying: { type: Boolean, required: true },
    videoReady: { type: Boolean, required: true },
    videoLoading: { type: Boolean, required: true },
    setVideoRef: { type: Function, required: true },
    startVideo: { type: Function, required: true },
    playVideo: { type: Function, required: true },
    pauseVideo: { type: Function, required: true },
    onVideoLoaded: { type: Function, required: true },
    handleVideoProgress: { type: Function, required: true },
    setVideoLoading: { type: Function, required: true },
    setVideoReady: { type: Function, required: true },
    setVideoPlaying: { type: Function, required: true },
})
</script>
