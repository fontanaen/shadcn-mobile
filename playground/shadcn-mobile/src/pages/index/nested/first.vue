<script setup lang="ts">
import { Modal, ModalClose, ModalContent, ModalDescription, ModalHeader, ModalOverlay, ModalTitle, ModalToolbar, ModalTrigger } from '@/components/ui/modal'
import Page from '@/components/ui/page/Page.vue'
import { X } from 'lucide-vue-next';
import { ref } from 'vue';

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
            <ModalTitle>First Modal</ModalTitle>
            <ModalDescription>This is the first level of nested modals. Notice how the modal gets wider
                to show the nesting hierarchy.
            </ModalDescription>
          </ModalHeader>

          <div class="px-6">
            <ModalTrigger to="/nested/first/second">
              <button class="w-full rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 font-medium">
                Open Second Modal
              </button>
            </ModalTrigger>
          </div>
      </ModalContent>
    </Modal>

    <RouterView />
  </template> 