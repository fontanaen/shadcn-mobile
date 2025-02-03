<script setup lang="ts">
import { Modal, ModalClose, ModalContent, ModalDescription, ModalHeader, ModalOverlay, ModalTitle, ModalToolbar } from '@/packages/core/src/components/modal'
import Page from '@/components/ui/page/Page.vue'
import { X } from 'lucide-vue-next';
import { ref } from 'vue'

const open = ref(true)
</script>

<template>
    <Modal v-model:open="open">
      <ModalOverlay />
      <ModalContent>
        <ModalToolbar>
          <ModalClose>
            <X class="h-6 w-6 text-slate-600" />
          </ModalClose>
        </ModalToolbar>

        <ModalHeader>
          <ModalTitle>Third Modal</ModalTitle>
          <ModalDescription>
            This is the third and final level of nested modals. You can close each modal individually or use the back button to navigate through the stack.
          </ModalDescription>
        </ModalHeader>

        <div class="px-6">

          <div class="rounded-lg bg-accent/20 p-4">
            <h3 class="font-semibold">Navigation Stack</h3>
            <ul class="mt-2 list-inside list-disc space-y-1 text-sm">
              <li>Home</li>
              <li>First Modal</li>
              <li>Second Modal</li>
              <li>Third Modal (current)</li>
            </ul>
          </div>
        </div>

        <div class="px-6">
          <button
            class="w-full rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 font-medium"
            @click="open = false"
          >
            Close Modal
          </button>
        </div>
      </ModalContent>
    </Modal>
</template> 