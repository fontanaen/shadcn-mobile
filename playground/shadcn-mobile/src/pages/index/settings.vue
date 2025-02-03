<script setup lang="ts">
import { ref } from 'vue'
import { Modal, ModalClose, ModalContent, ModalDescription, ModalHeader, ModalOverlay, ModalTitle, ModalToolbar } from '@/packages/core/src/components/modal';

const isDarkMode = ref(false)
const notifications = ref(true)
const email = ref('')
const open = ref(true)
</script>

<template>
    <Modal v-model:open="open" inline>
      <ModalOverlay />
      <ModalContent>
        <ModalToolbar>
          <ModalClose>
            <span class="text-indigo-500 font-medium">Cancel</span>
          </ModalClose>

          <ModalClose>
            <span class="text-indigo-500 font-medium">Save</span>
          </ModalClose>
        </ModalToolbar>

        <ModalHeader>
          <ModalTitle>Settings</ModalTitle>
          <ModalDescription>Manage your account settings and preferences.</ModalDescription>
        </ModalHeader>
        
        <div class="space-y-6 px-6">
          <div class="space-y-2">
            <h2 class="text-lg font-semibold">Appearance</h2>
            <div class="flex items-center justify-between rounded-lg border-2 border-slate-200 border-dotted p-4">
              <div class="space-y-0.5">
                <label class="text-sm font-medium">Dark Mode</label>
                <p class="text-sm text-slate-500">
                  Toggle dark mode appearance
                </p>
              </div>
              <button
                class="relative h-6 w-11 rounded-full bg-muted"
                :class="{ 'bg-accent': isDarkMode }"
                @click="isDarkMode = !isDarkMode"
              >
                <span
                  class="absolute inset-y-0.5 left-0.5 aspect-square rounded-full bg-white transition-transform"
                  :class="{ 'translate-x-5': isDarkMode }"
                />
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <h2 class="text-lg font-semibold">Notifications</h2>
            <div class="flex items-center justify-between rounded-lg border-2 border-slate-200 border-dotted p-4">
              <div class="space-y-0.5">
                <label class="text-sm font-medium">Push Notifications</label>
                <p class="text-sm text-slate-500">
                  Receive push notifications
                </p>
              </div>
              <button
                class="relative h-6 w-11 rounded-full bg-muted"
                :class="{ 'bg-accent': notifications }"
                @click="notifications = !notifications"
              >
                <span
                  class="absolute inset-y-0.5 left-0.5 aspect-square rounded-full bg-white transition-transform"
                  :class="{ 'translate-x-5': notifications }"
                />
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <h2 class="text-lg font-semibold">Account</h2>
            <div class="rounded-lg border-2 border-slate-200 border-dotted p-4">
              <div class="space-y-2">
                <label class="text-sm font-medium">Email</label>
                <input
                  v-model="email"
                  type="email"
                  placeholder="Enter your email"
                  class="w-full rounded-md border-2 border-slate-200 bg-transparent px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
</template> 