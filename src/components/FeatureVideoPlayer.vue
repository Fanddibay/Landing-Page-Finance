<template>
    <div class="relative w-full bg-gradient-to-br from-green-50 to-white aspect-[9/19.5] overflow-hidden">
        <!-- Static Image Placeholder - Only show before video is started -->
        <div v-if="!videoStarted"
            class="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
            <img :src="placeholder" alt="Video placeholder" class="w-full h-full object-cover" loading="lazy"
                decoding="async">
        </div>

        <!-- Loading Animation - Removed for faster loading -->

        <!-- Video Element - Always visible once started, even when paused -->
        <video v-if="videoSrc && videoStarted" :ref="(el) => setVideoRef(el, index, videoType)" :src="videoSrc"
            :data-video-index="index" :data-video-type="videoType" class="w-full h-full object-cover" muted loop
            playsinline preload="none" @loadedmetadata="onVideoLoaded(index)" @canplay="setVideoReady(index, true)"
            @play="setVideoPlaying(index, true)" @playing="setVideoPlaying(index, true)"
            @pause="setVideoPlaying(index, false)" @ended="setVideoPlaying(index, false)"
            @click.stop="videoPlaying ? pauseVideo(index) : playVideo(index)"></video>

        <!-- Play Button Overlay (shown on placeholder image - before video started) -->
        <button v-if="!videoStarted" @click.stop="startVideo(index)"
            class="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-200 group z-40">
            <div
                class="w-20 h-20 rounded-full bg-primary-500/90 hover:bg-primary-600 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-200 backdrop-blur-sm">
                <svg class="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                </svg>
            </div>
        </button>

        <!-- Play Button (shown when video is paused - after video started) -->
        <button v-else-if="!videoPlaying && videoStarted && videoReady" @click.stop="playVideo(index)"
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
    videoLoading: { type: Boolean, required: false }, // Optional - kept for backward compatibility
    setVideoRef: { type: Function, required: true },
    startVideo: { type: Function, required: true },
    playVideo: { type: Function, required: true },
    pauseVideo: { type: Function, required: true },
    onVideoLoaded: { type: Function, required: true },
    handleVideoProgress: { type: Function, required: false }, // Optional - no-op for performance
    setVideoReady: { type: Function, required: true },
    setVideoPlaying: { type: Function, required: true },
})
</script>
