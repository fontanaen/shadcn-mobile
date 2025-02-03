<script setup lang="ts">
import { ref } from 'vue'
import { Modal, ModalContent, ModalOverlay } from '@/components/ui/modal'
import Page from '@/components/ui/page/Page.vue'
import { ChevronLeft } from 'lucide-vue-next'

const open = ref(true)
const agreed = ref(false)

const handleContinue = () => {
  if (agreed.value) {
    open.value = false
  }
}
</script>

<template>
    <Modal v-model:open="open" inline>
      <ModalOverlay />
      <ModalContent>
        <Page
          title="Important Notice"
        >
          <template #icon>
            <ChevronLeft class="h-6 w-6" />
          </template>
          <template #default>
            <div class="space-y-4">
              <div class="rounded-lg bg-accent/20 p-4">
                <p class="text-sm">
                  This modal cannot be dismissed by swiping or tapping the backdrop.
                  You must explicitly agree to the terms to close it.
                </p>
              </div>

              <div class="space-y-4">
                <h3 class="font-semibold">Terms and Conditions</h3>
                <div class="h-[40vh] space-y-4 overflow-y-auto rounded-lg border p-4">
                  <p class="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                  <p class="text-sm text-muted-foreground">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.
                  </p>
                </div>

                <label class="flex items-center gap-2">
                  <input
                    v-model="agreed"
                    type="checkbox"
                    class="h-4 w-4 rounded border-accent"
                  />
                  <span class="text-sm">I agree to the terms and conditions</span>
                </label>
              </div>
            </div>
          </template>

          <template #footer>
            <button
              class="w-full rounded-md px-4 py-2 text-accent-foreground disabled:opacity-50"
              :class="agreed ? 'bg-accent hover:bg-accent/90' : 'bg-muted'"
              :disabled="!agreed"
              @click="handleContinue"
            >
              Continue
            </button>
          </template>
        </Page>
      </ModalContent>
    </Modal>
</template> 