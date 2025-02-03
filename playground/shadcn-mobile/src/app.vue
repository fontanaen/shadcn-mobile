<script setup lang="ts">
import { ModalStackProvider } from '@/components/ui/modal'
</script>

<template>
  <ModalStackProvider v-slot="{ context }">
    <div 
      class="min-h-screen bg-background text-foreground antialiased bg-black"
      :class="{'overscroll-none overflow-hidden': context.isModalOpen}"
    >
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </div>
  </ModalStackProvider>
</template>