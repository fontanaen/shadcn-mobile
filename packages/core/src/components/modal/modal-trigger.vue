<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "radix-vue";
import { useModalStack } from "./modal-stack-provider.vue";

const props = withDefaults(defineProps<PrimitiveProps & ({ to: string } | { replace: string })>(), {
  as: "div",
});

const { openModal } = useModalStack();

function handleClick() {
  if ("to" in props) {
    openModal({ to: props.to });
  } else {
    openModal({ replace: props.replace });
  }
}
</script>

<template>
  <Primitive v-bind="props" @click="handleClick">
    <slot />
  </Primitive>
</template> 