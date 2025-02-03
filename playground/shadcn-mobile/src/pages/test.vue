<script setup lang="ts">
import Page from '@/components/ui/page/Page.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Main content -->
    <Page title="Modal Examples" :showBackButton="false">
      <div class="space-y-4">
        <div class="rounded-lg border bg-card p-4">
          <h2 class="font-semibold">Modal Types</h2>
          <p class="text-sm text-muted-foreground">Explore different modal behaviors</p>
          <div class="mt-4 grid gap-2">
            <button @click="$router.back()" class="w-full rounded-md bg-accent px-4 py-2 text-accent-foreground hover:bg-accent/90">
              Back
            </button>
          </div>
        </div>
      </div>
    </Page>

    <!-- Modal outlet -->
    <RouterView />
  </div>
</template> 