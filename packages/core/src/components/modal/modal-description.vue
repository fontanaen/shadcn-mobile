<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

type ModalHeaderProps = {
    class?: HTMLAttributes['class']
}

const props = defineProps<ModalHeaderProps>()
</script>

<template>
    <div :class="cn('text-sm text-slate-500', props.class)">
        <slot />
    </div>
</template>