<script setup lang="ts">
import { Modal, ModalClose, ModalContent, ModalDescription, ModalHeader, ModalOverlay, ModalTitle, ModalToolbar } from '@/components/ui/modal'
import { X } from 'lucide-vue-next';
import { ref } from 'vue';

const open = ref(true)
</script>

<template>
  <Modal v-model:open="open">
    <ModalOverlay />
    <ModalContent>
      <div class="h-full w-full overflow-y-auto">
        <ModalToolbar>
          <ModalClose>
            <X class="h-6 w-6 text-slate-600" />
          </ModalClose>
        </ModalToolbar>

        <ModalHeader>
          <ModalTitle>Simple Modal</ModalTitle>
          <ModalDescription>This is a basic modal that can be dismissed by:</ModalDescription>
        </ModalHeader>

        <div class="space-y-4 h-[300vh] px-6">

          <ul class="list-inside list-disc space-y-2 text-sm">
            <li>Swiping down</li>
            <li>Using the back button</li>
            <li>Using the close button below</li>
          </ul>

          <div class="h-[200vh] bg-accent/20 rounded-lg p-4 mt-4">
            <p class="text-sm">
              This is a tall content area to demonstrate scrolling.
              The modal can be scrolled without interfering with the swipe-to-dismiss gesture.
            </p>
          </div>
        </div>
          
        <div class="px-6 mb-4">
          <button
            class="w-full rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 font-medium"
            @click="open = false"
          >
            Close Modal
          </button>
        </div>
      </div>
    </ModalContent>
  </Modal>
</template> 