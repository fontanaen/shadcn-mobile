<script lang="ts">
interface ModalStackProvider {
  stack: Ref<Map<string, ModalState>>
  currentModal: Ref<ModalState | undefined>
  isModalOpen: Ref<boolean>
  openModal: (id: string, path: string) => void
  dismissCurrentModal: () => void
  onDismissRequested: EventHookOn<{id: string}>
  triggerDismissExecuted: EventHookTrigger<{id: string}>
}

export interface ModalState {
  id: string
  path: string
  isOpen: boolean
  isClosing: boolean
  isSwiping: boolean
  swipeProgress: number
  route?: RouteLocationRaw
  stackIndex: number
}

const modalStack = ref<Map<string, Reactive<ModalState>>>(new Map())

const ModalStackProviderKey: InjectionKey<ModalStackProvider> = Symbol('ModalStackProvider')

export function createModalStackContext() {
  const router = useRouter()

  const onDismissRequestedHook = createEventHook<{id: string}>()
  const onDismissExecutedHook = createEventHook<{id: string}>()

  const currentModal = computed(() => modalStack.value.get(Array.from(modalStack.value.keys())[modalStack.value.size - 1]) as ModalState | undefined)
  const isModalOpen = computed(() => modalStack.value.size > 0)

  onDismissExecutedHook.on(({id}) => {
    modalStack.value.delete(id)
    router.back()
  })

  function dismissCurrentModal() {
    if (currentModal.value) {
      onDismissRequestedHook.trigger({id: currentModal.value.id})
    }
  }

  function openModal(path: string) {
    router.push(path)
  }

  provide(ModalStackProviderKey, {
    stack: modalStack,
    currentModal,
    isModalOpen,
    openModal,
    dismissCurrentModal,
    onDismissRequested: onDismissRequestedHook.on,
    triggerDismissExecuted: onDismissExecutedHook.trigger,
  })

  watch(isModalOpen, (value) => {
    if (value) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  })

  return {
    isModalOpen,
    currentModal,
    dismissCurrentModal,
    onDismissRequested: onDismissRequestedHook.on,
    triggerDismissExecuted: onDismissExecutedHook.trigger,
  }
}

export function useModalStack() {
  const context = inject(ModalStackProviderKey)
  if (!context) {
    throw new Error('useModalStack must be used within a modal component')
  }
  return context
}
</script>

<script setup lang="ts">
import { createEventHook, type EventHookOn, type EventHookTrigger } from '@vueuse/core'
import { ref, computed, type InjectionKey, provide, type Ref, inject, type Reactive, watch } from 'vue'
import { useRouter, type RouteLocationRaw } from 'vue-router'

const context = createModalStackContext()
</script>

<template>
  <slot :context="context" />
</template>
