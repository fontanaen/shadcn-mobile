<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

type ModalHeaderProps = {
    class?: HTMLAttributes['class']
}

const props = defineProps<ModalHeaderProps>()
</script>

<template>
    <div :class="cn('text-2xl font-semibold leading-none', props.class)">
        <slot />
    </div>
</template>