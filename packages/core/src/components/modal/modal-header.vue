<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

type ModalHeaderProps = {
    class?: HTMLAttributes['class']
}

const props = defineProps<ModalHeaderProps>()
</script>

<template>
    <div :class="cn('flex flex-col gap-2 px-6 py-4 mb-4', props.class)">
        <slot />
    </div>
</template>