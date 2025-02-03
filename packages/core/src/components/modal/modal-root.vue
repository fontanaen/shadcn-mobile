<script setup lang="ts">
import { createModalContext } from './modal-context'
import { useRoute } from 'vue-router'
import { toRef } from 'vue';

const props = withDefaults(defineProps<{
  open?: boolean
  inline?: boolean
  canSwipeToDismiss?: boolean
  onWillDismiss?: () => boolean | Promise<boolean>
  onTryDismissOnSwipeDisabled?: () => boolean | Promise<boolean>
}>(), {
  open: true,
  inline: false,
  canSwipeToDismiss: true,
  onWillDismiss: () => true,
  onTryDismissOnSwipeDisabled: () => false,
});

const route = useRoute()

const open = defineModel<boolean>('open', { default: true })

const context = createModalContext({
  open,
  inline: toRef(props, 'inline'),
  canSwipeToDismiss: toRef(props, 'canSwipeToDismiss'),
  path: route.path,
  onWillDismiss: props.onWillDismiss,
  onTryDismissOnSwipeDisabled: props.onTryDismissOnSwipeDisabled,
})
</script>

<template>
  <Teleport to="body" :disabled="context.inline.value">
    <slot />
  </Teleport>
</template> 