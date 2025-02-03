<script setup lang="ts">
import { useModalStack } from './modal-stack-provider.vue';

const props = defineProps<{
  to: string
}>()

const { openModal } = useModalStack()

function handleClick() {
  openModal(props.to, props.to)
}
</script>

<template>
  <div @click="handleClick">
    <slot />
  </div>
</template> 