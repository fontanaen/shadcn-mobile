<script setup lang="ts">
import Page from '@/components/ui/page/Page.vue'
import { ModalTrigger } from '@/packages/core/src/components/modal'
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Main content -->
    <Page>
      <div class="space-y-4">
        <div class="rounded-lg border-2 border-dotted border-slate-200 p-4">
        <h2 class="font-semibold">Modal Types</h2>
          <p class="text-sm text-slate-500 font-medium">Explore different modal behaviors</p>
          <div class="mt-4 grid gap-2">
            <ModalTrigger to="/simple">
              <button class="w-full rounded-md px-4 py-2 border border-slate-200 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold">
                Simple Modal
              </button>
            </ModalTrigger>

            <ModalTrigger to="/nested/first">
              <button class="w-full rounded-md px-4 py-2 border border-slate-200 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold">
                Nested Modals
              </button>
            </ModalTrigger>

            <ModalTrigger to="/settings">
              <button class="w-full rounded-md px-4 py-2 border border-slate-200 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold">
                Inline Modal
              </button>
            </ModalTrigger>
          </div>
        </div>
      </div>
    </Page>

    <!-- Modal outlet -->
    <RouterView />
  </div>
</template> 