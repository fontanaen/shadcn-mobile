<script setup lang="ts">
import { useModalStack } from '@/components/ui/modal';

interface Props {
  title?: string
  showBackButton?: boolean
}

withDefaults(defineProps<Props>(), {
  showBackButton: true,
})

const modalStack = useModalStack()

const handleBack = () => {
  modalStack.closeCurrentModal()
}
</script>

<template>
  <div class="flex h-full w-full flex-col">
    <!-- Header -->
    <header class="flex h-14 items-center justify-between px-4">
      <div class="flex items-center gap-2">
        <button
          class="flex h-6 w-6 items-center justify-center rounded-full"
          @click="handleBack"
        >
          <slot name="header-left" />
        </button>
      </div>

      <div class="flex items-center gap-2">
        <button
          class="flex h-6 w-6 items-center justify-center rounded-full"
          @click="handleBack"
        >
          <slot name="header-right" />
        </button>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1 overflow-y-auto p-4">
      <slot />
    </main>

    <!-- Footer -->
    <footer v-if="$slots.footer" class="p-4">
      <slot name="footer" />
    </footer>
  </div>
</template> 