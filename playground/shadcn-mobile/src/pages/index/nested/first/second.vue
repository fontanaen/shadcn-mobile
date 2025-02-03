<script setup lang="ts">
import { Modal, ModalClose, ModalContent, ModalDescription, ModalHeader, ModalOverlay, ModalTitle, ModalToolbar } from '@/components/ui/modal'
import { ModalTrigger } from '@/components/ui/modal'
import { X } from 'lucide-vue-next'
import { ref } from 'vue'

const open = ref(true)
const canSwipeToDismiss = ref(false)

function onWillDismiss() {
  return true
}

function onTryDismissOnSwipeDisabled() {
  return false
}
</script>

<template>
  <Modal v-model:open="open" :canSwipeToDismiss="canSwipeToDismiss" :onWillDismiss="onWillDismiss" :onTryDismissOnSwipeDisabled="onTryDismissOnSwipeDisabled">
      <ModalOverlay />
      <ModalContent>
          <ModalToolbar>
            <ModalClose>
              <X class="h-6 w-6 text-slate-600" />
            </ModalClose>
          </ModalToolbar>

          <ModalHeader>
            <ModalTitle>Second Modal</ModalTitle>
            <ModalDescription>
              This is the second level of nested modals. The background gets darker to show the nesting depth.
            </ModalDescription>
          </ModalHeader>

          <div class="px-6">
            <div class="flex items-center gap-4 border-2 border-dotted border-slate-200 rounded-md p-4 my-6">
              <input id="canSwipeToDismiss" type="checkbox" v-model="canSwipeToDismiss" class="h-5 w-5" />
              <label for="canSwipeToDismiss" class="text-sm text-slate-700">Can swipe to dismiss</label>
            </div>
          </div>

          <div class="px-6">
            <ModalTrigger to="/nested/first/second/third">
              <button class="w-full rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 font-medium">
                Open Third Modal
              </button>
            </ModalTrigger>
          </div>
      </ModalContent>
    </Modal>

    <RouterView />
</template> 