import { ref, onMounted, onUnmounted, nextTick } from 'vue'

export function useScrollAnimation(options = {}) {
  const elementRef = ref(null)
  const isVisible = ref(false)
  let observer = null
  
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
  } = options

  onMounted(async () => {
    await nextTick()
    if (!elementRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            if (observer && elementRef.value) {
              observer.unobserve(elementRef.value)
            }
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value)
      observer.disconnect()
    }
  })

  return {
    elementRef,
    isVisible,
  }
}
