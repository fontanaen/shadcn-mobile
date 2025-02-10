# Introduction

This project currently provides a powerful modal navigation component for Vue, built with the same design philosophy as Shadcn UI. This component reimagines the mobile modal pattern with a modern, customizable approach that Shadcn UI is known for.

## Why This Project?

While Shadcn UI has revolutionized how we build and customize components by providing unstyled, accessible components that can be copied into your project and tailored to your needs, there was a gap in mobile-specific navigation patterns. This project addresses that by:

- Providing a Vue 3 implementation of a robust modal navigation system
- Maintaining Shadcn's philosophy of unstyled, customizable components
- Offering seamless integration with mobile frameworks like CapacitorJS and NativeScript
- Supporting complex navigation patterns through a sophisticated modal system

## Key Features

- **Advanced Modal Navigation**: A complete reimagining of Ionic's modal component using Shadcn UI's design principles, featuring:
  - Bottom sheet-style modal with smooth animations
  - Gesture-based dismissal
  - Nested modal support
  - Router integration
  - Customizable header, content, and footer sections
  - Touch-friendly scrolling behavior
- **Vue 3 + TypeScript**: Built with modern Vue practices and full TypeScript support
- **Mobile-First**: Designed specifically for mobile applications with touch gestures and native-like interactions
- **Framework Agnostic**: Works with popular mobile frameworks like CapacitorJS and NativeScript
- **Customizable**: Following Shadcn's approach, the component can be copied and customized to fit your needs

## Technical Requirements

This component relies on modern Vue features and utilities:

- **Vue 3.3+**: Required for the usage of `defineModel()` and `useTemplateRef()` composables
- **@vueuse/core**: Utilized for various composition utilities that enhance the component's functionality
- **TypeScript**: Full type safety and better developer experience
- **Tailwind CSS**: Utilized for styling the component

Make sure your project meets these requirements before implementing the component.

## Getting Started

Clone the repo and run the example project to see the modal component in action. The playground is set up with a Capacitor project to demonstrate real mobile usage.

```bash
git clone https://github.com/yourusername/shadcn-mobile
cd shadcn-mobile
bun install

bun dev
or
bunx cap run ios/android
```

## Philosophy

This project follows Shadcn's component philosophy. Instead of providing a traditional component library, we offer a carefully crafted modal component that you can copy into your project and customize to your needs. This approach gives you:

- Complete control over your component code
- No dependency on external component libraries
- The ability to modify and adapt the component as your needs evolve
- A better understanding of the component you're using

Whether you're building a mobile web app, a PWA, or a native mobile application with CapacitorJS or NativeScript, this modal component provides a solid foundation for implementing professional mobile navigation patterns. While currently focused on the modal component, the project may expand to include more mobile-specific components in the future, all following the same principles of customization and control.