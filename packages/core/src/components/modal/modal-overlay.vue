<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useModalContext } from './modal-context'
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { state } = useModalContext()
</script>

<template>
  <div
    :class="cn('fixed inset-0 bg-black/50 touch-none', props.class)"
    :style="{ opacity: 1 - state.swipeProgress }"
    @click.prevent.stop
    @touchstart.prevent.stop
    @touchmove.prevent.stop
    @touchend.prevent.stop
    @touchcancel.prevent.stop
  />
</template> 