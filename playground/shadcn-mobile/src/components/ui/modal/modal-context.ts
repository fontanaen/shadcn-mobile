import { inject, provide, computed, type InjectionKey, reactive, type Ref, ref } from 'vue'
import { type ModalState, useModalStack } from './modal-stack-provider.vue'
import { whenever } from '@vueuse/core'

export interface ModalContextProps {
  open: Ref<boolean>
  inline: Ref<boolean>
  canSwipeToDismiss: Ref<boolean>
  path: string,
  onWillDismiss: () => boolean | Promise<boolean>
  onTryDismissOnSwipeDisabled: () => boolean | Promise<boolean>
}

export interface ModalContextEmits {
  (e: 'update:open', value: boolean): void
  (e: 'willDismiss', value: () => boolean): void
  (e: 'tryDismissOnSwipeDisabled', value: () => boolean): void
}

export interface ModalContext {
  id: string
  path: string
  open: Ref<boolean, boolean>
  inline: Ref<boolean, boolean>
  canSwipeToDismiss: Ref<boolean, boolean>
  isClosing: boolean
  swipeProgress: number
  isCurrent: boolean
  stackIndex: number
  state: ModalState
  dismiss: () => void
  onWillDismiss: () => boolean | Promise<boolean>
  triggerTryDismissOnSwipeDisabled: () => boolean | Promise<boolean>
  setSwipeProgress: (progress: number) => void
  setIsClosing: (isClosing: boolean) => void
}

const ModalContextKey: InjectionKey<ModalContext> = Symbol('ModalContext')

export function createModalContext(options: ModalContextProps) {
  const { 
    path, 
    open, 
    inline, 
    canSwipeToDismiss, 
    onWillDismiss, 
    onTryDismissOnSwipeDisabled 
  } = options

  const { stack, currentModal, dismissCurrentModal, triggerDismissExecuted } = useModalStack()
  const id = `modal-${path}`

  if (!stack.value.has(id)) {
    stack.value.set(id, reactive({
      id,
      path: options.path,
      route: options.path, 
      isOpen: open.value,
      isClosing: false,
      swipeProgress: 0,
      isSwiping: false,
      isCurrent: false,
      isBehind: false,
      stackIndex: stack.value.size
    }))
  }

  const modalState = computed(() => stack.value.get(id)!)

  const context: ModalContext = reactive({
    id,
    path: options.path,
    open,
    inline,
    canSwipeToDismiss,
    get state() {
      return modalState.value
    },
    get isClosing() {
      return modalState.value?.isClosing
    },
    get swipeProgress() {
      return modalState.value?.swipeProgress
    },
    get isCurrent() {
      return currentModal.value?.id === id
    },
    get stackIndex() {
      return modalState.value?.stackIndex
    },
    setSwipeProgress: (progress) => {
      if (modalState.value) {
        modalState.value.swipeProgress = progress
      }
    },
    setIsClosing: (value) => {
      modalState.value.isClosing = value
    },
    dismiss: () => {
      modalState.value.isClosing = true
      triggerDismissExecuted({ id })
    },
    onWillDismiss: async () => {
      return await onWillDismiss?.() ?? false
    },
    triggerTryDismissOnSwipeDisabled: async () => {
      return await onTryDismissOnSwipeDisabled?.() ?? false
    }
  })

  provide(ModalContextKey, context)

  whenever(() => open.value === false, () => dismissCurrentModal())

  return context
}

export function useModalContext() {
  const context = inject(ModalContextKey)
  if (!context) {
    throw new Error('useModalContext must be used within a modal component')
  }
  return context
} 