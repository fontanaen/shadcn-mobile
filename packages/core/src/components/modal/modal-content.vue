<script setup lang="ts">
import { TransitionPresets, executeTransition } from '@vueuse/core'
import { CLOSE_DURATION, OPEN_DURATION, SWIPE_RESISTANCE_FACTOR, SWIPE_DISABLED_THRESHOLD, SWIPE_THRESHOLD } from './constant'
import { ref, computed, onMounted, watch } from 'vue'
import { useModalContext } from './modal-context'
import { useModalStack } from './modal-stack-provider.vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const modalStack = useModalStack()
const context = useModalContext()

const modalRef = ref<HTMLDivElement | null>(null)
const contentRef = ref<HTMLDivElement | null>(null)
const isDragging = ref(false)
const startY = ref(0)
const currentY = ref(0)
const modalHeight = ref(0)
const transitionY = ref(0)
const isScrolling = ref(false)
const scrollableElements = ref<HTMLElement[]>([])

let scrollTimeout: number | null = null

function findScrollableElements(container: HTMLElement): HTMLElement[] {
  const scrollables: HTMLElement[] = []
  const elements = container.querySelectorAll('*')
  
  for (const element of elements) {
    if (element instanceof HTMLElement) {
      const style = window.getComputedStyle(element)
      const hasScroll = style.overflowY === 'auto' || style.overflowY === 'scroll'
      if (hasScroll && element.scrollHeight > element.clientHeight) {
        scrollables.push(element)
      }
    }
  }
  
  return scrollables
}

function handleScroll(e: Event) {
  if (isDragging.value) {
    (e.target as HTMLElement).scrollTop = 0
    return
  }

  if (scrollTimeout) {
    window.clearTimeout(scrollTimeout)
  }

  isScrolling.value = true

  scrollTimeout = window.setTimeout(() => {
    isScrolling.value = false
  }, 150)

  if (isDragging.value) {
    isDragging.value = false
    transitionY.value = 0
  }
}

function isAtTop() {
  if (!contentRef.value) return true
  
  scrollableElements.value = findScrollableElements(contentRef.value)
  
  return !scrollableElements.value.some(element => element.scrollTop > 0)
}

function applyResistance(delta: number): number {
  return (SWIPE_RESISTANCE_FACTOR * modalHeight.value) * (1 - Math.exp(-delta / (modalHeight.value * 0.5)))
}

function handleTouchStart(e: TouchEvent) {
  if (!context.canSwipeToDismiss || context.inline || context.isClosing) return
  
  const touch = e.touches[0]
  startY.value = touch.clientY
  
  isDragging.value = isAtTop()
}

function handleTouchMove(e: TouchEvent) {
  if (context.inline || context.isClosing) return
  if (!isDragging.value && !isAtTop()) {
    e.stopPropagation()
    return
  }

  const touch = e.touches[0]
  const rawDeltaY = touch.clientY - startY.value
  
  if (!isDragging.value) {
    if (rawDeltaY > 0) {
      isDragging.value = true
      startY.value = touch.clientY - transitionY.value
    }
    return
  }

  currentY.value = touch.clientY
  
  if (rawDeltaY > 0) {
    transitionY.value = context.canSwipeToDismiss 
      ? rawDeltaY 
      : applyResistance(rawDeltaY)
  } else {
    isDragging.value = false
    transitionY.value = 0
  }
}

const containerClasses = computed(() => [
  context.inline ? 'h-full' : 'h-[calc(95svh-env(safe-area-inset-top))]',
])

const modalClasses = computed(() => [
  context.inline ? 'h-full rounded-none' : 'rounded-t-[10px] h-full',
  isDragging.value ? 'touch-none' : 'touch-pan-y',
])

const swipeProgress = computed(() => {
  return Math.min(transitionY.value / modalHeight.value, 1)
})

const translateYValue = computed(() => {  
  return `translate3d(0, ${transitionY.value}px, 0)`
})

const behindStyles = computed(() => {
  if (context.isCurrent) return {
    transform: 'translate3d(0, 0, 0)',
    willChange: 'transform'
  }

  const nextModal = Array.from(modalStack.stack.value.values())[context.stackIndex + 1]

  if (!nextModal) return {
    transform: 'translate3d(0, 0, 0)',
    willChange: 'transform'
  }

  const baseScale = 0.93
  const progress = nextModal.swipeProgress ?? 0
  const scale = baseScale + (1 - baseScale) * progress
  const translateY = -5 + 5 * progress

  return { 
    transform: `translate3d(0, ${translateY}%, 0) scale(${scale})`,
    willChange: 'transform'
  }
})

async function returnToTop(startValue: number, duration: number = CLOSE_DURATION): Promise<void> {
  return new Promise((resolve) => {
    const startTime = performance.now()

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easeOut = 1 - Math.pow(1 - progress, 3)
      transitionY.value = startValue * (1 - easeOut)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        transitionY.value = 0
        startY.value = 0
        currentY.value = 0
        resolve()
      }
    }
    
    requestAnimationFrame(animate)
  })
}

async function handleTouchEnd() {
  if (!isDragging.value) {
    startY.value = 0
    currentY.value = 0
    return;
  }

  if (context.canSwipeToDismiss && swipeProgress.value > SWIPE_THRESHOLD) {
    isDragging.value = false
    modalStack.dismissCurrentModal()
    return;
  }

  if (!context.canSwipeToDismiss && swipeProgress.value > SWIPE_DISABLED_THRESHOLD) {
    await context.triggerTryDismissOnSwipeDisabled()
  }

  isDragging.value = false
  await returnToTop(transitionY.value)
}

async function handleClose() {
  const startTime = performance.now()
  const startValue = transitionY.value
  const endValue = modalHeight.value
  const duration = CLOSE_DURATION

  async function animate(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    const easeInOut = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2
    
    transitionY.value = startValue + (endValue - startValue) * easeInOut
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      context.dismiss()
    }
  }
  
  requestAnimationFrame(animate)
}

modalStack.onDismissRequested(async ({ id }) => {
  if (id !== context.id) return;

  if (await context.onWillDismiss()) {
    await handleClose();
    return;
  }

  if (transitionY.value > 0) {
    await returnToTop(transitionY.value)
  }
})

watch(swipeProgress, (progress) => {
  context.setSwipeProgress(progress)
})

onMounted(() => {
  if (modalRef.value) {
    modalHeight.value = modalRef.value.offsetHeight;

    executeTransition(transitionY, modalHeight.value, 0, {
      duration: OPEN_DURATION,
      transition: TransitionPresets.easeInOutSine,
    })
  }
})
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 bottom-0 flex items-end justify-center overscroll-none will-change-transform"
    :class="containerClasses"
    :style="{ ...behindStyles }"
  >
    <div
      ref="modalRef"
      class="pointer-events-auto relative overflow-hidden w-full flex flex-col bg-white dark:bg-slate-900 shadow-lg overscroll-none will-change-transform"
      :class="[
        modalClasses,
        'transform-gpu'
      ]"
      :style="{ transform: translateYValue }"
      @click.stop
      @touchstart.passive="handleTouchStart"
      @touchmove.passive="handleTouchMove"
      @touchend.passive="handleTouchEnd"
      @touchcancel.passive="handleTouchEnd"
    >
      <div
        v-if="!context.inline"
        class="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 z-10 rounded-full bg-slate-300"
      />

      <div
        ref="contentRef"
        :class="cn(
          'min-h-0 flex-1 overflow-y-auto overscroll-none',
          isDragging && 'overflow-hidden',
          props.class
        )"
        @scroll.capture="handleScroll"
      >
        <slot />
      </div>
    </div>
  </div>
</template> 