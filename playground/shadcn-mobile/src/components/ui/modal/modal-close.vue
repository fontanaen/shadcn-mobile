<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'radix-vue';
import { useModalStack } from './modal-stack-provider.vue';

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: 'div'
})

const { dismissCurrentModal } = useModalStack();
</script>

<template>
    <Primitive v-bind="props" @click="dismissCurrentModal()">
        <slot />
    </Primitive>
</template>