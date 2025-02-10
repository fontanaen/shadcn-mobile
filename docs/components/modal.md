# Modal component

An IOS-like modal/drawer/sheet page component.

::: warning
Not recommanded for web usage right now.

Optimized for mobile frameworks like CapacitorJS and NativeScript.
:::

## Installation

Copy paste components from [github repo](https://github.com/fontanaen/shadcn-mobile) on your project.
It's cheap for now but I'm working on a better solution. (waiting for shadcn-vue registry)

## Routing
Modal is coupled with vue-router. It use nested navigation to show the modal and stack.

If you want to use modal without vue-router, I recommand using `Drawer` component from shadcn/ui.

::: tip
For optimal routing experience with modals, I recommend using [unplugin-vue-router](https://github.com/posva/unplugin-vue-router). This plugin provides type-safe routing and better integration with Vue Router, which is essential for handling nested modal navigation and back/forward navigation properly.
:::

``` text
src/pages/
├── index.vue - root page
├── about.vue
└── index/users/[id]
    ├── index.vue - user modal page
    └── profile
        ├── index.vue - profile modal page (nested modal)
        └── settings
            ├── index.vue - settings modal page (nested modal)
```

You must have a `<RouterView />` inside your modal page to show a nested modal page.

On dismissing a modal, the `router.back()` will be called after **the modal dimiss animation is complete**.

## Components

| Component | Description |
| ---- | ---- |
| `ModalStackProvider` | Provide a modal stack context to the app |
| `Modal` | The modal root component |
| `ModalContent` | The content of the modal |
| `ModalToolbar` | The toolbar of the modal |
| `ModalHeader` | The header of the modal |
| `ModalTitle` | The title of the modal |
| `ModalDescription` | The description of the modal |
| `ModalClose` | The close button of the modal |
| `ModalOverlay` | The overlay of the modal |
| `ModalTrigger` | Button to open a modal |

## Setup 

You must wrap your app with `ModalStackProvider` to use the modal component.
Prevent the page from overscrolling when a modal is open.

```vue [app.vue]
<script setup lang="ts">
import { ModalStackProvider } from '@/packages/core/src/components/modal'
</script>

<template>
  <ModalStackProvider v-slot="{ context }">
    <div 
      class="min-h-screen bg-background text-foreground antialiased bg-black"
      :class="{'overscroll-none overflow-hidden': context.isModalOpen}"
    >
      <RouterView />
    </div>
  </ModalStackProvider>
</template>
```

## Basic Usage

::: code-group

```vue [index.vue (root page)]
<script setup lang="ts">
import { ref } from 'vue'
import { ModalTrigger} from '@/components/ui'
</script>

<template>
  <div>
    <h1>Root Page</h1>

    <ModalTrigger to="/nested">
      <button>Open Modal</button>
    </ModalTrigger>
  </div>

  <RouterView />
</template>
```

```vue [nested.vue (nested modal page)]
<script setup lang="ts">
import { ref } from 'vue'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalClose,
  ModalBody,
  ModalFooter,
  ModalOverlay
} from '@/components/ui'

const open = ref(false)
</script>

<template>
  <Modal v-model:open="open">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <ModalTitle>Profile</ModalTitle>
        <ModalDescription>
          This is a profile modal.
        </ModalDescription>
      </ModalHeader>
      <ModalBody>
        <p>This is the body of the modal.</p>
      </ModalBody>
      <ModalFooter>
        <ModalClose>
          <Button>Close</Button>
        </ModalClose>
      </ModalFooter>
    </ModalContent>
  </Modal>

  <!-- For nested navigation -->
  <RouterView />
</template>
```

``` text [router structure]
src/pages/
├── index.vue - root page
└── index/
    └── nested.vue - user modal page
```

:::

## Page transition with navigation

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalClose,
  ModalBody,
  ModalFooter,
  ModalOverlay
} from '@/components/ui'

const open = ref(false)
</script>

<template>
  <Modal v-model:open="open">
    <ModalOverlay />
    <ModalContent>
        <RouterView v-slot="{ Component }">
            <Transition name="...">
                <Component :is="Component" />
            </Transition>
        </RouterView>
    </ModalContent>
  </Modal>
</template>
```

## Props

### Modal

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `open` | `boolean` | `true` | Whether the modal is open or not |
| `canSwipeToDismiss` | `boolean` | `true` | Controls whether the modal can be dismissed via swipe gesture. When enabled, swiping down dismisses the modal. When disabled, swipe attempts are met with haptic resistance feedback and the modal remains open. |
| `inline` | `boolean` | `false` | Whether the modal is inline |
| `onDismiss` | `() => void` | `undefined` | Called when the modal is about to be dismissed. You can use it to replace default dismiss action. By default, `router.back()` is called. |
| `willDismiss` | `() => boolean` | `() => true` | Called when the modal is about to be dismissed. Return `true` to dismiss the modal, `false` to ignore the action. |
| `tryDismissOnSwipeDisabled` | `() => boolean` | `() => false` | Called when the modal can't be dismissed by swiping but user tries to dismiss it. Return `true` to dismiss the modal, `false` to ignore the action. |

### ModalTrigger

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `to` | `string` | `undefined` | The route to navigate to when the modal is opened |
| `replace` | `string` | `undefined` | The route to replace when the modal is opened |

## Emits

### Modal

| Emits | Type | Description |
| ---- | ---- | ----------- |
| `update:open` | `boolean` | Whether the modal is open or not |

## Features

- 🎨 Clean and modern UI design
- 📱 Safe area inset
- 🔄 Integration with router navigation
- 🎯 Accessible components
- 🎨 Consistent styling with Shadcn UI