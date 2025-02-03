<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useModalContext } from './modal-context';

type ModalHeaderProps = {
    class?: HTMLAttributes['class']
}

const props = defineProps<ModalHeaderProps>()

const context = useModalContext()
</script>

<template>
    <div 
        :class="cn(
            'flex items-center justify-between px-6 py-4 mb-4 bg-white dark:bg-zinc-950 sticky top-0 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800',
            context.inline && 'mt-[env(safe-area-inset-top)]',
            props.class
        )"
    >
        <slot />
    </div>
</template>