<template>
  <section class="py-16 md:py-24 bg-green-50 overflow-hidden">
    <div class="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <!-- Badge -->
      <div class="flex justify-center mb-8">
        <div class="inline-flex items-center gap-2 bg-primary-900 text-white px-4 py-2 rounded-lg">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="text-sm font-semibold">{{ t.testimonial.badge }}</span>
        </div>
      </div>

      <!-- Title -->
      <h2 ref="titleRef"
        :class="['text-3xl font-semibold text-gray-900 text-center mb-12 md:mb-16 w-full max-w-[1035px] mx-auto px-4 sm:px-6', isVisible ? 'fade-in-up visible' : 'fade-in-up']">
        {{ t.testimonial.title }}
      </h2>

      <!-- Row 1: Scrolls left to right -->
      <div class="testimonial-row-wrapper mb-6">
        <div class="testimonial-row testimonial-row-1">
          <div class="testimonial-card" v-for="(testimonial, index) in duplicatedTestimonials" :key="`row1-${index}`">
            <div class="testimonial-card-inner">
              <div class="quote-mark">"</div>
              <p class="testimonial-quote">{{ testimonial.quote }}</p>
              <div class="testimonial-author">
                <img :src="testimonial.avatar" :alt="testimonial.name" class="testimonial-avatar" />
                <div>
                  <p class="testimonial-name">{{ testimonial.name }}</p>
                  <p class="testimonial-role">{{ testimonial.role }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 2: Scrolls right to left -->
      <div class="testimonial-row-wrapper">
        <div class="testimonial-row testimonial-row-2">
          <div class="testimonial-card" v-for="(testimonial, index) in duplicatedTestimonials" :key="`row2-${index}`">
            <div class="testimonial-card-inner">
              <div class="quote-mark">"</div>
              <p class="testimonial-quote">{{ testimonial.quote }}</p>
              <div class="testimonial-author">
                <img :src="testimonial.avatar" :alt="testimonial.name" class="testimonial-avatar" />
                <div>
                  <p class="testimonial-name">{{ testimonial.name }}</p>
                  <p class="testimonial-role">{{ testimonial.role }}</p>
                </div>
              </div>
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

const { t } = useI18n()
const { elementRef: titleRef, isVisible } = useScrollAnimation()

// Duplicate testimonials for seamless looping
const duplicatedTestimonials = computed(() => {
  const testimonials = t.value?.testimonial?.testimonials || []
  return [...testimonials, ...testimonials]
})
</script>

<style scoped>
.testimonial-row-wrapper {
  overflow: hidden;
  width: 100%;
  position: relative;
}

.testimonial-row {
  display: flex;
  gap: 1.5rem;
  width: fit-content;
}

.testimonial-row-1 {
  animation: scroll-left 40s linear infinite;
}

.testimonial-row-2 {
  animation: scroll-right 45s linear infinite;
}

.testimonial-row-wrapper:hover .testimonial-row-1,
.testimonial-row-wrapper:hover .testimonial-row-2 {
  animation-play-state: paused;
}

.testimonial-card {
  flex-shrink: 0;
  width: 300px;
}

@media (max-width: 640px) {
  .testimonial-card {
    width: 280px;
  }

  .testimonial-row-1 {
    animation-duration: 50s;
  }

  .testimonial-row-2 {
    animation-duration: 55s;
  }
}

.testimonial-card-inner {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  padding-top: 2.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.testimonial-card-inner:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.quote-mark {
  font-size: 4rem;
  line-height: 1;
  color: #2563eb;
  font-weight: 700;
  margin-bottom: 0.5rem;
  opacity: 0.3;
  position: absolute;
  top: 0.5rem;
  left: 1rem;
}

.testimonial-quote {
  color: #1e293b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  flex-grow: 1;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: auto;
}

.testimonial-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.testimonial-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.testimonial-role {
  color: #64748b;
  font-size: 0.8rem;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

@keyframes scroll-right {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
